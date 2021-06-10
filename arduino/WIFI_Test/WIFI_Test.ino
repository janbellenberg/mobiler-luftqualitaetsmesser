// https://wolles-elektronikkiste.de/wemos-d1-mini-boards
#include "ESP8266WebServer.h"
#define LEDPIN D1
const char* ssid = "HNBK-Schueler";
const char* pass = "wlanhnbk22112012";

void setup(){
  pinMode(LEDPIN, OUTPUT);
  digitalWrite(LEDPIN, LOW);
  Serial.begin(9600); 
  Serial.println("Testprogramm - Minimalprogramm ESP8266");
  Serial.print("Verbinde mich mit Netz: ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  
  while(WiFi.status() != WL_CONNECTED){
  delay(500); Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi Verbindung aufgebaut");
  Serial.print("Eigene IP des ESP-Modul: ");
  Serial.println(WiFi.localIP());
} 
  
void loop(){
}
