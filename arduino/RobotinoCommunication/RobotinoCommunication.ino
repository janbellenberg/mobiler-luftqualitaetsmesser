#include <avr/interrupt.h>

void setup() {
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT_PULLUP);
  Serial.begin(9600);

  cli();
  PCICR |= 0b00000100;
  PCMSK2 |= 0b10000000;
  sei();
}

void loop() {
}

ISR(PCINT2_vect) {
  if(digitalRead(7) == HIGH){
    byte value = 0;
  
    for(byte i = 0; i < 5; i++) {
      byte tmp = digitalRead(i + 2);
      if(tmp == HIGH) {
        value |= (0x01 << i);
      }
    }
  
    Serial.println(value);
  }
}
