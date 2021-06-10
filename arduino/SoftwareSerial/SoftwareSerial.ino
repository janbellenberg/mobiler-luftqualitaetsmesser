#include <SoftwareSerial.h>

SoftwareSerial co2(6,7);
void setup() {
  // put your setup code here, to run once:
  pinMode(6, INPUT);
  pinMode(7, OUTPUT);
  co2.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:

}
