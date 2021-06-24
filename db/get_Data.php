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
                        Pos_Nr, DATE_FORMAT(cTimestamp, '%H.%i') AS 'time' FROM Messung 
                        WHERE
                        DATE_FORMAT(cTimestamp,'%Y-%m-%d') = '$data' 
                        AND
                        Pos_Nr = $position ;"; 
    
                $result = $con->query($sql)->fetchAll();

                if ($result != null) {
                        foreach ($result as $row) {
                            
                            
                            $response = array(
                                'temperature' => (float) $row["temperatur_Wert"],
                                'humidity' => (float) $row["feuchtigkeit_Wert"],
                                'co2' => (float) $row["co2_Wert"],
                                'timestamp' =>  (float) $row["time"]
                            );

                            //$String_response = implode(",", $response);
                            //echo "<br> $String_response <br>";

                            if ($response != null) {
                                $json =  json_encode($response);
                                if ($json === false) {
                                    http_response_code(500);
                                }else echo $json;
                            }              
                          
                        } 
                }

    
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["locations"])) {
        //$building = $_GET["building"];
        //Connection DB
        $con = $db->__get("con");

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Gebaeude_Name FROM gebaeude;";

                $result = $con->query($sql)->fetchAll();

                if ($result != null) {
                    foreach ($result as $row) {
                        $Gebaeude_Name = $row["Gebaeude_Name"];

                        $response = array(
                            "id" => $Ge_Nr,
                            "building" => $Gebaeude_Name
                        );

                        if ($response != null) {
                            $json = json_encode($response);
                            if ($json === false) {
                                http_response_code(500);
                            }else echo $json;
                        }
                    }
                }

            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }



    }

    if (isset($_GET["rooms"])) {
        //$room = $_GET["room"];
        //Connection DB
        $con = $db->__get("con");

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Raum_Name FROM raum;";
                
                $result = $con->query($sql)->fetchAll();
                
                if ($result != null) {
                    foreach ($result as $row) {
                        $room = $row["Raum_Name"];

                        $response = array(
                            $room
                        );

                        if ($response != null) {
                            $json = json_encode($response);
                            if ($json === false) {
                                http_response_code(500);
                            }else echo $json;
                        }
                    }
                }

                
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["positions"])) {
        //$position_Nr = $_GET["position"];
        //Connection DB
        $con = $db->__get("con");    

        $response = null;

        if ($con != null) {
            try {
                $sql = "SELECT Position FROM positionstelle";            
                $result = $con->query($sql)->fetchAll();
                    
                if ($result != null) {
                    foreach ($result as $row) {
                        $position = $row["Position"];
    
                        $response = array(
                            $position
                        );
    
                        if ($response != null) {
                            $json = json_encode($response);
                            if ($json === false) {
                                http_response_code(500);
                            }else echo $json;
                        }
                    }
                }

            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }
?>
