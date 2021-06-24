<?php
    require_once 'Connection.php';
    $db = new Connection();

    if (isset($_GET["date"]) && isset($_GET["position"])) {
        $data = $_GET["date"];
        $position = $_GET["position"];
        //Connection DB
        $db = new Connection();
        $con = $db->__get("con");

        // TO return JSON from PHP
        $response = null;
    
    
        if ($con != null) {
            try {
                $sql = "SELECT co2_Wert, temperatur_Wert, feuchtigkeit_Wert,
                        Pos_Nr, DATE_FORMAT(cTimestamp, '%H:%i') AS 'time' FROM Messung 
                        WHERE
                        DATE_FORMAT(cTimestamp,'%Y-%m-%d') = '$data' 
                        AND
                        Pos_Nr = $position ;"; 
    
                $result = $con->query($sql)->fetchAll();
                $resultArray = array();

                if ($result != null) {
                        foreach ($result as $row) {
                            $response = array(
                                'temperature' => (float) $row["temperatur_Wert"],
                                'humidity' => (float) $row["feuchtigkeit_Wert"],
                                'co2' => (float) $row["co2_Wert"],
                                'timestamp' =>  $row["time"]
                            );
                            array_push($resultArray, $response);                          
                        } 
                    }
                echo json_encode($resultArray);
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["locations"])) {
        //$building = $_GET["building"];
        //Connection DB
        $db = new Connection();
        $con = $db->__get("con");

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Ge_Nr,Gebaeude_Name FROM gebaeude;";

                $result = $con->query($sql)->fetchAll();
                $resultArray = array();

                if ($result != null) {
                    foreach ($result as $row) {

                        $response = array(
                            "id" => (int)$row["Ge_Nr"],
                            "name" => $row["Gebaeude_Name"]
                        );
                        array_push($resultArray, $response);
                    }
                }
                echo json_encode($resultArray);
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["location_id"])) {
        $location_id = $_GET["location_id"];
        //Connection DB
        $con = $db->__get("con");

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Raum_Name FROM raum WHERE Ge_Nr = $location_id;";
                
                $result = $con->query($sql)->fetchAll();
                $resultArray = array();
                
                if ($result != null) {
                    foreach ($result as $row) {
                        array_push($resultArray, (int)$row["Raum_Name"]); 
                    }
                    
                }
                echo json_encode($resultArray);
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["room_id"])) {
        $room_id = $_GET["room_id"];
        //Connection DB
        $con = $db->__get("con");    

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Pos_Nr FROM positionstelle INNER JOIN raum ON raum.Ra_Nr = positionstelle.Ra_Nr WHERE raum.Raum_Name = $room_id";
                $result = $con->query($sql)->fetchAll();
                $resultArray = array();
                    
                if ($result != null) {
                    foreach ($result as $row) {
                        array_push($resultArray, (int)$row["Pos_Nr"]);
                    }
                    
                }
                echo json_encode($resultArray);
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    /*
    if ($response != null) {
                            $json = json_encode($response);
                            if ($json === false) {
                                http_response_code(500);
                            }else echo $json;
    }
    */

?>
