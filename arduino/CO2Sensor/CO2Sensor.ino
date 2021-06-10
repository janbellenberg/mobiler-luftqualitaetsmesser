void setup() {
  Serial.begin(9600);
  pinMode(7, INPUT);
}

void loop() {
  getPWM();
}

double getPWM() {
  double h = pulseIn(7, HIGH, 1500000) / 1000.0;
  double cppm = 2000.0 * (h - 2.0) / 1000.0;
  Serial.println(h);
  Serial.println(cppm);
  Serial.println("");

  return cppm;
}