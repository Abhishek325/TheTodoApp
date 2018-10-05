<?php
namespace Prote\DBI\DAL;
use PHPMailer\PHPMailer;
use DIC\Service;

class common
{
    private $Service = NULL;
    public $Db = NULL;
    
    public function __construct(Service $Service)
    {
        $this->Service = $Service;
        $this->Db      = $this->Service->Database();
    }

    public function addTodoItems($todoItemTitle,$todoItemDescription)
    { 
       $this->Db->set_parameters(array($todoItemTitle,$todoItemDescription));
        if ($this->Db->query('INSERT into todo (todo,description) values (?,?)')) {
            return "success";
        } else {
            return "failed";
        }
    }

    public function getTodoItems()
    { 
        if($data = $this->Db->find_many('SELECT id,todo as title,description,DATE_FORMAT(`created_dt`,"%M %d, %Y") as created_dt, DATE_FORMAT(created_dt,"%H:%i") as created_time, IsCompleted from `todo` order by created_ts desc'))
            return $data;
        else
            return "";
    }
    
    public function updateTodoItem($todoId,$IsCompleted)
    { 
        $this->Db->set_parameters(array($IsCompleted,$todoId));
        if ($this->Db->query('UPDATE `todo` SET `IsCompleted`=? WHERE `id` = ?')) {
            return 1;
        } else {
            return 0;
        }
    }
    
    
    public function deleteTodoItem($todoItemId)
    { 
        $this->Db->set_parameters(array($todoItemId));
        if ($this->Db->query('DELETE from `todo` where id = ?')) {
            return "success";
        } else {
            return "failure";
        }
    }
    
    public function encryptVal($val)
    {
        $iv_size      = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv           = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        $iv           = substr(hash('sha256', $iv), 0, 16);
        $encryptedVal = openssl_encrypt($val, "AES-256-CBC", hash('sha256', "Abh1sh3k"), 0, $iv);
        return base64_encode($iv . $encryptedVal);
    }
    
    public function decryptVal($val)
    {
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv      = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        $iv      = substr(hash('sha256', $iv), 0, 16);
        $iv      = substr(base64_decode($val), 0, $iv_size);
        return openssl_decrypt(substr(base64_decode($val), $iv_size), "AES-256-CBC", hash('sha256', "Abh1sh3k"), 0, $iv);
    }

    public function install(){
        $payload = "  CREATE TABLE `todo` (
              `id` int(11) NOT NULL,
              `todo` varchar(25) NOT NULL,
              `description` varchar(100) NOT NULL,
              `created_ts` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
              `due_date` datetime DEFAULT NULL,
              `IsCompleted` char(1) NOT NULL DEFAULT 'N'
            ) ENGINE=MyISAM DEFAULT CHARSET=latin1;";
        $this->Db->drop_payload($payload,$this);
    }
}