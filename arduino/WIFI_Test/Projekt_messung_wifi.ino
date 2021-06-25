#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

//#include <DateTime.h>

#define startMessung D3

// WiFi Parameters
const char* ssid = "HNBK-Schueler"; // 
const char* password = "wlanhnbk22112012"; // 

bool BLINK = false;
  
void setup() 
{
  pinMode(startMessung,INPUT);
  Serial.begin(115200);

 // WiFi-Initialisierung##############################
                                                
  WiFi.begin(ssid, password); 
  while (WiFi.status() != WL_CONNECTED)
  { 
    delay(1000);
    Serial.println("Connecting to WiFi...");
  } 
  Serial.println("in setup ...");
  if (WiFi.status() == WL_CONNECTED)
  { 
     Serial.println("WiFi Connected"); 
     Serial.print("Connected, IP address: ");
     Serial.println(WiFi.localIP());
     Serial.println();
  }  
}
 
void loop() 
{
  
 if (digitalRead(startMessung) == 1)  // warten bei HIGH-Signal (Taster nicht gedrückt)
 {
 
  // Check WiFi Status
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http;  //Object of class HTTPClient

    String sppmH2 = "1234.5";
    String url =  "http://www.hnbk-lehmann.de/BG18_Praxis/DB_schreibe_Messwert.php?Messwert="+sppmH2+"&Sensor_ID=2";
    //String url =  "http://192.168.178.89/DB_schreibe_Messwert.php?Messwert="+sppmH2+"&Sensor_ID=2";
    //String url =  "http://10.40.44.227/DB_schreibe_Messwert.php?Messwert="+sppmH2+"&Sensor_ID=2";
    Serial.print("url: "); Serial.println(url);
    Serial.println("Serverabfrage....");

    http.begin(url);
    
    Serial.println("nach http.begin");
    //delay(300);
    int httpCode = http.GET();
    Serial.println("nach get");
    //delay(300);
    //Check the returning code  
    Serial.print("httpCode="); Serial.println(httpCode);                                                                
    if (httpCode == 200) 
    {
      Serial.println("Daten gespeichert");
    }
    http.end();   //Close connection
  }   
 } // -- Messung starten
   delay(500);
}
