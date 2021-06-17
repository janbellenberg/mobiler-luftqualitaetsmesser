<?php
    if (isset($_GET["data"])) {
        $data = $_GET["data"];
        require_once 'Connection.php';
        $db = new connection();
        $con = $this->__get("con");

        $temperature; 
        $temperature_timestamp;
        $humidity;
        $humidity_timestamp;
        $co2;
        $co2_timestamp;
    
    
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
                }

                foreach ($con->query($statment_2) as $row) {
                    $humidity = $row["Messung_Wert"];
                    $humidity_timestamp = $row["timestamp"];
                }

                foreach ($con->query($statment_3) as $row) {
                    $co2 = $row["Messung_Wert"];
                    $co2_timestamp = $row["timestamp"];
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
