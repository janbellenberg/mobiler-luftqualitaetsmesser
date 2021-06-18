<?php
    require_once 'Connection.php';
    $db = new Connection();

    if (isset($_GET["date"]) && isset($_GET["position"])) {
        $data = $_GET["date"];
        $position = $_GET["position"];
        //Connection DB
        $con = $db->__get("con");

        // TO return JSON from PHP
        $response = array();
    
    
        if ($con != null) {
            try {
                $sql = "SELECT co2_Wert, temperatur_Wert, feuchtigkeit_Wert,
                        Pos_Nr, DATE_FORMAT(cTimestamp, '%H:%i') AS 'time' FROM Messung 
                        WHERE
                        DATE_FORMAT(cTimestamp,'%Y-%m-%d') = '$data' 
                        AND
                        Pos_Nr = $position ;"; 
    
                $result = $con->query($sql)->fetchAll();

                foreach ($result as $row) {

                    $co2_Wert = $row["co2_Wert"];
                    $temperatur_Wert = $row["temperatur_Wert"];
                    $feuchtigkeit_Wert = $row["feuchtigkeit_Wert"];
                    $time = $row["time"];
                    
                    $response = array(
                        'co2' => $co2_Wert,
                        'temperature' => $temperatur_Wert,
                        'humidity' => $feuchtigkeit_Wert,
                        'timestamp' => $time
                    );

                }
                
                $json =  json_encode($response);
                echo $json;
                if ($json === false) {
                    http_response_code(500);
                }
    
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }

    if (isset($_GET["building"])) {
        //Connection DB
        $con = $this->__get("con");
    }
    if (isset($_GET["room"])) {
        $room = 
        //Connection DB
        $con = $this->__get("con");
    }
?>
