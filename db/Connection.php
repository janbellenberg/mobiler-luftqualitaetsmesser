<?php

class connection{
    private $servername;
    private $dbname; 
    private $dbusername;
    private $dbpassword;
    private $dns; // //Data Source Name
    private $con;


    function __construct()
    {
        $this->servername = "";
        $this->dbname = "messstation";
        $this->dbusername = "";
        $this->dbpassword = "";
        $this->dsn = "mysql:host=$this->servername;dbname=$this->dbname";
        $this->setConnection();
    }

    function setConnection()
    {
        $con = null;
        try{
            $con = new PDO($this->dns, $this->dbusername, $this->dbpassword);
            $this->__set("con", $con);
        }catch(PDOException $e){
            echo "Connection Failed: " . $e->getMessage();
            $con == null;
        }
    }

    function __get($name)
    {
        switch ($name) {
            case 'con':
                return $this->con;
            default:
                    echo "<br/> Failed occurred switch __get($name) <br/>";
                break;
        }
    }

    function __set($name, $value)
    {
        switch ($name) {
            case 'con':
                $this->con = $value;
                break;
        }
        return $value;
    }


    //die Connection to Database after skript executed
    function __destruct()
    {
        $this->__set("con", null);
    }

} 

?>