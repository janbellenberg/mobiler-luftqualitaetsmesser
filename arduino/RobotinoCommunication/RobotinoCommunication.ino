void setup() {
  Serial.begin(9600);
}

void loop() {
  byte value = 0;

  for(byte i = 0; i < 5; i++) {
    byte tmp = digitalRead(i + 2);
    if(tmp == HIGH) {
      value |= (0x01 << i);
    }
  }

  Serial.println(value);
}
