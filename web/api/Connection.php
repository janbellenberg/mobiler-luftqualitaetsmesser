<?php

class Connection{
    private $servername;
    private $dbname; 
    private $dbusername;
    private $dbpassword;
    private $dsn; // //Data Source Name
    private $con;


    function __construct()
    {
        // for local: $this->servername = "localhost";
        // for docker:
        $this->servername = "mysql";
        $this->dbname = "messstation";
        $this->dbusername = "mlqm";
        $this->dbpassword = "gXg33Ep4urGp6bF2";
        $this->dsn = "mysql:host=$this->servername;dbname=$this->dbname";
        $this->setConnection();
    }

    function setConnection()
    {
        $con = null;
        try{
            $con = new PDO($this->dsn, $this->dbusername, $this->dbpassword);
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
            case 'dsn':
               $this->con = $value;
                break;
            default:
                echo "<br/> Failed occurred switch __set($name, $value) <br/>";
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