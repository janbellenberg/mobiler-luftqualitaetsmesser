#include "DHT.h"
#include <SoftwareSerial.h>

#define DHTPIN 12
#define DHTTYPE DHT11
#define LEDgreen 10
#define LEDyellow 9
#define LEDred 8

SoftwareSerial co2Serial(2, 3); // define MH-Z19 RX TX
DHT dht11HNBK(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  pinMode(LEDgreen,OUTPUT);
  pinMode(LEDyellow,OUTPUT);  
  pinMode(LEDred,OUTPUT);
    
  co2Serial.begin(9600);
  dht11HNBK.begin();

}

void loop() {
  delay(5000);
  
  float hudty = dht11HNBK.readHumidity();
  float temp = dht11HNBK.readTemperature();
  
  if(isnan(hudty) || isnan(temp))
  {
    Serial.println("Ein Fehler ist bei der Datenübertragung aufgetreten. \nDie Sensordaten konnten nicht ausgelesen werden. Bitte versuchen Sie es erneut!");
    return;
  }
  
  int ppm, temperature = 0;
  readSensor(&ppm, &temperature);
  
  if (ppm < 1000 && (40 > hudty && hudty < 60 ) && temp < 26) // gute Luft
  {
    digitalWrite(LEDgreen, HIGH);
    digitalWrite(LEDyellow, LOW);
    digitalWrite(LEDred, LOW);
  }
  else if ((ppm < 1000 && (hudty < 40 || hudty > 60) && temp < 26) || (ppm < 1000 && (40 > hudty && hudty < 60 ) && temp > 25) || ((ppm > 1000 && ppm < 1500) && (40 > hudty && hudty < 60 ) && temp < 26))
  {
    digitalWrite(LEDgreen, HIGH);
    digitalWrite(LEDyellow, HIGH);
    digitalWrite(LEDred, LOW);
  }
  else if ((ppm < 1000 && (hudty < 40 || hudty > 60) && temp > 25) || ((ppm > 1000 && ppm < 1500) && (hudty < 40 || hudty > 60) && temp < 26) || ((ppm > 1000 && ppm < 1500) && (40 > hudty && hudty < 60 ) && temp > 25))
  {
    digitalWrite(LEDgreen, LOW);
    digitalWrite(LEDyellow, HIGH);
    digitalWrite(LEDred, LOW);
  }
  else if (((ppm > 1500 && ppm < 2000) && (hudty < 40 || hudty > 60) && temp < 26)) || ((ppm > 1500 && ppm < 2000) && (40 > hudty && hudty < 60 ) && temp > 25)
  {
    digitalWrite(LEDgreen, LOW);
    digitalWrite(LEDyellow, HIGH);
    digitalWrite(LEDred, HIGH);
  }
  else
  {
    digitalWrite(LEDgreen,LOW);
    digitalWrite(LEDyellow, LOW);
    digitalWrite(LEDred, HIGH);    
  }

  Serial.print("Luftqualitaet: ");
  Serial.print(ppm);
  Serial.println("ppm (aktuell)\n""Luftfeuchtigkeit: ");
  Serial.print(hudty);
  Serial.println("% (aktuell)\nTemperatur: ");
  Serial.print(temp);
  Serial.println("°C (aktuell)");
}


void readSensor(int *ppm, int *temperature)
{

  // Die Befehlskette zum Einlesen des PPM-Wertes laut Datenblatt
  
  byte cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};

  // Speicherplatzreservierung von 9 Byte für die Antwort des Sensors.
  // Alles Befehle und Antworten des Sensors haben eine Länge von
  // 9 Byte, wobei das letzte Byte eine Prüfsumme zur Kontrolle
  // der Übermittlung darstellt.
  
  byte response[9]; 

  // Befehl zum Auslesen schreiben
  
  co2Serial.write(cmd, 9);

  // Zuerst den Eingangsbuffer löschen (mit 0 füllen) und
  // danach in einer while-Schleife darauf warten, bis 
  // die Funktion co2Serial.available() einen Wert ungleich 0
  // zurückgibt.
  
  memset(response, 0, 9);
  while (co2Serial.available() == 0)
  {
    delay(1000);
  }

  // Die Antwort wird in den Speicher eingelesen.
  
  co2Serial.readBytes(response, 9);

  // Die Prüfsumme mit Hilfe einer eigenen Funk-
  // tion errechnen, um zu klären, ob die 
  // Übertragung fehlerfrei abgelaufen ist.
  
  byte check = getCheckSum(response);
  
  if (response[8] != check)
  {
    Serial.println("Fehler in der Übertragung!");
    return;
  }
 
  // PPM-Wert errechnen, sie finden sind
  // im 3. und 4. Byte der Antwort im Format
  // HIGH-Byte und LOW-Byte und müssen über die
  // folgende Formel zu einem Word (int) verkettet
  // werden.
  
  *ppm = 256 * (int)response[2] + response[3];

  // Temperaturwert wird als 5. Byte der Response
  // übermittelt (im Datenblatt nicht angegeben).
  // Damit auch negative Temperaturen übertragen 
  // werden können, wurde der Wert 40 dazuaddiert,
  // der jetzt wieder entfernt werden muss.
  
  *temperature = response[4] - 40;

}


// Die Funktion errechnet eine Prüfsumme über die
// durch einen Zeiger übergebene Befehls- oder
// Antwortkette. Der Algorithmus zur 
// Prüfsummenberechnung findet sich im
// Datenblatt.

byte getCheckSum(byte *packet)
{
  byte i;
  byte checksum = 0;
  for (i = 1; i < 8; i++) {
    checksum += packet[i];
  }
  checksum = 0xff - checksum;
  checksum += 1;
  return checksum;
}
