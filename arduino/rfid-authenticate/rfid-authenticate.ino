/*
 * Typical pin layout used:
 * -----------------------------------------------------------------------------------------
 *             MFRC522      Arduino       Arduino   Arduino    Arduino          Arduino
 *             Reader/PCD   Uno/101       Mega      Nano v3    Leonardo/Micro   Pro Micro
 * Signal      Pin          Pin           Pin       Pin        Pin              Pin
 * -----------------------------------------------------------------------------------------
 * RST/Reset   RST          9             5         D9         RESET/ICSP-5     RST
 * SPI SS      SDA(SS)      10            53        D10        10               10
 * SPI MOSI    MOSI         11 / ICSP-4   51        D11        ICSP-4           16
 * SPI MISO    MISO         12 / ICSP-1   50        D12        ICSP-1           14
 * SPI SCK     SCK          13 / ICSP-3   52        D13        ICSP-3           15
 *
 */

#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define RST_PIN         9          // Configurable, see typical pin layout above
#define SS_PIN          10         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance
Servo myservo;

int pos = 0;

void setup() {
	Serial.begin(9600);		// Initialize serial communications with the PC
  Serial.setTimeout(10);
  myservo.attach(6);
  myservo.write(pos);
  delay(1000);
	while (!Serial);		// Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
	SPI.begin();			// Init SPI bus
	mfrc522.PCD_Init();		// Init MFRC522
	delay(4);				// Optional delay. Some board do need more time after init to be ready, see Readme
	mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
	Serial.println(F("Scan PICC to see IDs, SAK, type, and data blocks..."));
}

void loop() {
  String input = Serial.readStringUntil('\n');
  input.trim();

  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    Serial.print("UID: ");
    // String content= "";

    for (byte i = 0; i < mfrc522.uid.size; i++) 
    {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
      // content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : ""));
      // content.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    // content.toUpperCase();
    Serial.println();
    mfrc522.PICC_HaltA(); // Stop reading
    return;
  }

  if (input.equals("lock")) {
    Serial.print("Status: lock");
    Serial.println();
    ServoClose();
    delay(1000);
    return;
  }

  if (input.equals("unlock")) {
    Serial.print("Status: unlock");
    Serial.println();
    ServoOpen();
    delay(1000);
    return;
  }

  if(input.equals("granted")) {
    Serial.print("Access: granted");
    Serial.println();
    ServoOpen();
    delay(1000);
    return;
  }

  if(input.equals("denied")) {
    Serial.print("Access: denied");
    Serial.println();
    return;
  }
  
  delay(500);
}



void ServoClose() {
  for (pos = 180; pos >= 0; pos -= 5) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}

void ServoOpen() {
  for (pos = 0; pos <= 180; pos += 5) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}