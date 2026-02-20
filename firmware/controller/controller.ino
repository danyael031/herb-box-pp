const String SOLICITUD_SENSORES = "S";

void setup() {
  Serial.begin(9600);
  // Espera opcional a que el puerto serial esté listo (útil en algunos entornos)
  while (!Serial) {
    ; 
  }
}

void randomSensorValues(String out[3]) {
  for (byte i = 0; i < 3; i++) {
    out[i] = String(random(20, 31)); // [20, 30]
  }
}

void loop() {
  String sensorValues[3];

  delay(5*1000);  // delay in between reads for stability

  randomSensorValues(sensorValues);
  Serial.print("\{\"plantId\": 1,\"airHumidity\": ");
  Serial.print(sensorValues[0]);
  Serial.print(",\"groundHumidity\": ");
  Serial.print(sensorValues[1]);
  Serial.print(",\"temperature\": ");
  Serial.print(sensorValues[2]);
  Serial.println("\}");
  //if (Serial.available() > 0) {
  //  // Leer el mensaje completo hasta salto de línea
  //  String mensaje = Serial.readStringUntil('\n');
  //  mensaje.trim(); // Elimina espacios y saltos de línea

  //  if (mensaje == SOLICITUD_SENSORES) {
  //    randomSensorValues(sensorValues);
  //    Serial.print("\{\"plantId\": 1,\"airHumidity\": ");
  //    Serial.print(sensorValues[0]);
  //    Serial.print(",\"groundHumidity\": ");
  //    Serial.print(sensorValues[1]);
  //    Serial.print(",\"temperature\": ");
  //    Serial.print(sensorValues[2]);
  //    Serial.println("\}");

  //  }
  //}
}
