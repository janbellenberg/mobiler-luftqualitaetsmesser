byte dataPins[] = {D4, D5, D6, D7, D3};
volatile bool read = false;
 
void setup() {
 
  Serial.begin(9600);
  pinMode(D4, INPUT_PULLUP);
  pinMode(D5, INPUT_PULLUP);
  pinMode(D6, INPUT_PULLUP);
  pinMode(D7, INPUT_PULLUP);
  pinMode(D3, INPUT_PULLUP);
  pinMode(D8, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(D8), handleInterrupt, RISING);
}
 
ICACHE_RAM_ATTR void handleInterrupt() {
  read = true;
}
 
void loop() {
  if(read){
    read = false;
    byte value = 0;
  
    for(byte i = 0; i < 5; i++) {
      byte tmp = digitalRead(dataPins[i]);
      if(tmp == LOW) {
        value |= (0x01 << i);
      }
    }
  
    Serial.println(value);
  }
}
