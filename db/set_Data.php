<?php
    require_once 'Connection.php';
    $db = new Connection();

    $check = false;

    if (isset($_GET["Pos_Nr"])) {
        $Pos_Nr = $_GET["Pos_Nr"];
        $check = true;
    }else $check = false;
    if (isset($_GET["co2_Wert"])) {
        $co2_Wert = $_GET["co2_Wert"];
        $check = true;
    }else $check = false;
    if (isset($_GET["temperatur_Wert"])) {
        $temperatur_Wert = $_GET["temperatur_Wert"];
        $check = true;
    }else $check = false;
    if (isset($_GET["feuchtigkeit_Wert"])) {
        $feuchtigkeit_Wert = $_GET["feuchtigkeit_Wert"];
        $check = true;
    }else $check = false;
    if ($check) {
        //Connection DB
        $db = new Connection();
        $con = $db->__get("con");

        // TO return JSON from PHP
        $response = null;
    
    
        if ($con != null) {
            try {
                $sql = "INSERT INTO `messung` (`co2_Wert`, `temperatur_Wert`, `feuchtigkeit_Wert`, `Pos_Nr`)
                VALUES ('$co2_Wert','$temperatur_Wert','$feuchtigkeit_Wert', '$Pos_Nr');";

                $con->exec($sql);

            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }
?>