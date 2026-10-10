import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { CommonUtil } from "src/utils";

@Injectable()
export class EncryptionService {
  private secretKey: Buffer;
  private readonly GCM_IV_LENGTH = 12;
  private readonly GCM_TAG_LENGTH = 16;

  constructor(private configService: ConfigService) {
    this.secretKey = Buffer.from(
      this.configService.get<string>("ENCRYPTION_SECRET_KEY"),
      "utf8"
    );
  }

  public encrypt(plainText: string): string {
    try {
      const iv = crypto.randomBytes(this.GCM_IV_LENGTH);

      const cipher = crypto.createCipheriv("aes-256-gcm", this.secretKey, iv);

      const encryptedText = Buffer.concat([
        cipher.update(plainText, "utf8"),
        cipher.final(),
      ]);

      const authTag = cipher.getAuthTag();

      const encryptedPayload = Buffer.concat([iv, encryptedText, authTag]);

      return encryptedPayload.toString("base64");
    } catch (error:any) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  public decrypt(cipherText: string): string {
    try {
      const decoded = Buffer.from(cipherText, "base64");

      const iv = decoded.slice(0, this.GCM_IV_LENGTH);
      const encryptedText = decoded.slice(
        this.GCM_IV_LENGTH,
        decoded.length - this.GCM_TAG_LENGTH
      );
      const authTag = decoded.slice(decoded.length - this.GCM_TAG_LENGTH);

      const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        this.secretKey,
        iv
      );

      decipher.setAuthTag(authTag);

      const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);

      return decryptedText.toString("utf8");
    } catch (error:any) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
  useEncryption(req: any): boolean {
    const ignore = req.headers["ignore_encryption"];
    const ignoreEncryption = ignore === "true" || ignore === "1";

    if (ignoreEncryption && !CommonUtil.isProd()) {
      return false;
    }

    return false;
  }
}
