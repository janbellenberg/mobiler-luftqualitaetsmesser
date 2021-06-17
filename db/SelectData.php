<?php
    if (isset($_GET["date"])) {
        $data = $_GET["date"];
        require_once 'Connection.php';
        $db = new Connection();
        $con = $this->__get("con");

        // TO return JSON from PHP
        $response = array();
    
    
        if ($con != null) {
            try {
                $statment_1 = "SELECT Messung_Wert, DATE_FORMAT(Zeitpunkt, '%HH:%mm') AS 'timestamp' FROM Messung WHERE
                                Messung.Art_ID = 1 AND
                                Date(Zeitpunkt) = $data ";
                $statment_2 = "SELECT Messung_Wert, DATE_FORMAT(Zeitpunkt, '%HH:%mm') AS 'timestamp' FROM Messung WHERE
                               Messung.Art_ID = 2 AND
                               Date(Zeitpunkt) = $data ";
                $statment_3 = "SELECT Messung_Wert, DATE_FORMAT(Zeitpunkt, '%HH:%mm') AS 'timestamp' FROM Messung WHERE
                               Art_ID = 3 AND
                               Date(Zeitpunkt) = $data ";    


                foreach ($con->query($statment_1) as $row) {
                    $temperature = $row["Messung_Wert"];
                    $temperature_timestamp = $row["timestamp"];

                    
                    $response[0] = array(
                        'value' => $temperature,
                        'timestamp' => $temperature_timestamp
                    );

                }

                foreach ($con->query($statment_2) as $row) {
                    $humidity = $row["Messung_Wert"];
                    $humidity_timestamp = $row["timestamp"];

                    $response[1] = array(
                        'value' => $humidity,
                        'timestamp' => $humidity_timestamp
                    );
                }

                foreach ($con->query($statment_3) as $row) {
                    $co2 = $row["Messung_Wert"];
                    $co2_timestamp = $row["timestamp"];

                    $response[2] = array(
                        'value' => $co2,
                        'timestamp' => $co2_timestamp
                    );
                }

                echo json_encode($response);
                if ($json === false) {
                    http_response_code(500);
                }
    
            } catch (PDOException $e) {
                echo "Connection Failed: " . $e->getMessage();
                $con = null;
            }
        }
    }
/*
    Messung.Art_ID = 1 // temperature
    Messung.Art_ID = 2 // humidity
    Messung.Art_ID = 3 // co2
*/
?>
