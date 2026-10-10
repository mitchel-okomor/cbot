import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class EncryptionService {
  private secretKey: Buffer;
  private readonly GCM_IV_LENGTH = 12; // AES-GCM standard IV length
  private readonly GCM_TAG_LENGTH = 16; // AES-GCM tag length

  constructor(private configService: ConfigService) {
    this.secretKey = Buffer.from(
      this.configService.get<string>("ENCRYPTION_SECRET_KEY"),
      "utf8"
    );
  }

  /* Encryption Method */
  public encrypt(plainText: string): string {
    try {
      // Generate random IV
      const iv = crypto.randomBytes(this.GCM_IV_LENGTH);

      // Create Cipher instance
      const cipher = crypto.createCipheriv("aes-256-gcm", this.secretKey, iv);

      // Encrypt the plainText
      const encryptedText = Buffer.concat([
        cipher.update(plainText, "utf8"),
        cipher.final(),
      ]);

      // Get the authentication tag (for data integrity verification)
      const authTag = cipher.getAuthTag();

      // Combine IV, encryptedText, and authTag into one Buffer
      const encryptedPayload = Buffer.concat([iv, encryptedText, authTag]);

      // Return Base64 encoded encrypted payload
      return encryptedPayload.toString("base64");
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  /* Decryption Method */
  public decrypt(cipherText: string): string {
    try {
      // Decode the base64-encoded cipherText
      const decoded = Buffer.from(cipherText, "base64");

      // Extract the IV, encryptedText, and authTag from the decoded Buffer
      const iv = decoded.slice(0, this.GCM_IV_LENGTH);
      const encryptedText = decoded.slice(
        this.GCM_IV_LENGTH,
        decoded.length - this.GCM_TAG_LENGTH
      );
      const authTag = decoded.slice(decoded.length - this.GCM_TAG_LENGTH);

      // Create Decipher instance
      const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        this.secretKey,
        iv
      );

      // Set the authentication tag
      decipher.setAuthTag(authTag);

      // Decrypt the encryptedText
      const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);

      // Return the decrypted text as UTF-8
      return decryptedText.toString("utf8");
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
}
