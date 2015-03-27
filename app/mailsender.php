<?php
class Router 
{
	
    protected $routes;

    public function __construct()
    {
        $this->routes = $this->setRoutes();
        $this->route();
    }

    private function setRoutes()
    {
        return array('test-route');
    }

    private function route()
    {
        $mailController = new MailController();
    }

}

class MailController 
{
    private $response;

    public function __construct()
    {
        $this->prepMail();
    }

    private function initResponse()
    {
        return array(
            'error' => true,
            'code' => '500'
        );
    }

    private function updateResponse($error , $code, $e = null)
    {
        $this->response['error'] = $error;
        $this->response['code'] = $error;
        if ($e != null) {
            $this->response['message'] = $error;
        }
    }

    private function prepMail()
    {
        //fill mail holder object
        $mailSetting = new MailHolder();

        try {
            $mailSetting
                ->setFrom($_POST['name'])
                ->setTo('armand.rozanski@gmail.com')
                ->setReplyTo($_POST['email'])
                ->addToHeaders("From: ".$mailSetting->getFrom())
                ->addToHeaders("Reply-To: ".$mailSetting->getReplyTo())
                ->setBody($_POST['message']);
        } catch(Exception $e) {
            $this->updateResponse(true, '500', $e);
            $this->sendResponse();
        }

        //call mail service
        $sender = new MailService($mailSetting);
        //if mail sent set responce
        if ($sender->sendMail()) {
            $this->updateResponse(false, '200');
        } else {
            $this->updateResponse(true, '500');
        }
        
        //send response
        $this->sendResponse();

    }

    private function sendResponse()
    {
        echo json_encode($this->response);
    }

}

class MailService
{
    private $settings;

    public function __construct(MailHolder $mailHolder)
    {
        $this->settings = $mailHolder;
    }

    public function sendMail()
    {
        try {
            mail($this->settings->getTo(), 'Message from your website', nl2br($this->settings->getBody()), $this->settings->getHeaders());

            return true;
        } catch (Exception $e) {
            return false;
        }
        
    }
}

class MailHolder
{
    protected $from;
    protected $to;
    protected $replyTo;
    protected $body;
    protected $headers;

    public function setFrom($from)
    {
        if ($this->from == null) {
            $this->from = $from;
        }

        return $this;
    }

    public function getFrom()
    {
        if ($this->from != null) {
            return $this->from;
        }

        return false;
    }

    public function setTo($to)
    {
        if ($this->to == null) {
            $this->to = $to;
        }

        return $this;
    }

    public function getTo()
    {
        if ($this->to != null) {
            return $this->to;
        }

        return false;
    }

    public function setReplyTo($replyTo)
    {
        if ($this->replyTo == null) {
            $this->replyTo = $replyTo;
        }

        return $this;
    }

    public function getReplyTo()
    {
        if ($this->replyTo != null) {
            return $this->replyTo;
        }

        return false;
    }

    public function setBody($body)
    {
        if ($this->body == null) {
            $this->body = $body;
        }

        return $this;
    }

    public function getBody()
    {
        if ($this->body != null) {
            return $this->body;
        }

        return false;
    }

    public function addToHeaders($parameter)
    {
        if ($this->headers == null) {
            $this->headers = $parameter;
        } else {
            $this->headers.=$parameter;
        }
        $this->headers.="\r\n";

        return $this;
    }

    public function getHeaders()
    {
        if ($this->headers != null) {
            return $this->headers;
        }

        return false;
    }
}

$r = new Router();