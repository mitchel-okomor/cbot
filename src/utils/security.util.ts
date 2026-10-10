/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* tslint:disable no-var-requires */

import { createHash } from "node:crypto";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require("node:crypto");
const CryptoJS = require("crypto-js");

export class SecurityUtil {
  // static PBKDF2_ITERATIONS = 310000;
  // static KEY_LENGTH = 32;
  // static IV_LENGTH = 16;

  static readonly GCM_IV_LENGTH = 12; // AES-GCM standard IV length
  static readonly GCM_TAG_LENGTH = 16; // AES-GCM tag length

  static readonly IV_LENGTH = 16; // AES block size
  static readonly PBKDF2_ITERATIONS = 2;
  static readonly KEY_LENGTH = 32; // AES-256 = 32 bytes
  static readonly PBKDF2_DIGEST = "sha1"; // to match .NET default

  static readonly toSha1 = (data: string) => {
    return crypto.createHash("sha1").update(data).digest("hex");
  };

  public static readonly toSha512 = (data: string) => {
    return createHash("sha512").update(data).digest("hex");
  };

  static readonly decodeFromBase64 = (base64String: string): string => {
    return Buffer.from(base64String, "base64").toString("ascii");
  };

  static readonly toBase64 = (str: string): string => {
    return Buffer.from(str).toString("base64");
  };

  static readonly isBase64 = (str: string): boolean => {
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

    if (!base64Regex.test(str)) {
      return false;
    }

    try {
      // Try decoding and re-encoding to verify
      const decoded = atob(str);
      const reEncoded = btoa(decoded);
      return reEncoded === str;
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  };

  static readonly aesEncypt = (
    aesKey: string,
    aesIv: string,
    data: any,
  ): string => {
    const encryptionEncoding = "base64";
    const bufferEncryption = "utf-8";
    const iv = Buffer.from(aesIv);
    const cipher = crypto.createCipheriv(getAlgorithm(aesKey), aesKey, iv);
    let encrypted = cipher.update(data, bufferEncryption, encryptionEncoding);
    encrypted += cipher.final(encryptionEncoding);
    return encrypted;
  };

  static readonly aesDecrypt = (
    aesKey: string,
    aesIv: string,
    base64String: string,
  ): any => {
    const decipher = crypto.createDecipheriv(
      getAlgorithm(aesKey),
      aesKey,
      aesIv,
    );
    let decrypted = decipher.update(base64String, "base64");
    decrypted += decipher.final();
    return decrypted;
  };

  static readonly toSha256 = (data: string) => {
    return crypto.createHash("sha256").update(data).digest("hex");
  };

  static readonly createClientHash = async (
    message: string,
  ): Promise<string> => {
    const sha256Hasher = crypto.createHmac(
      "sha256",
      process.env.CLIENT_ENC_KEY,
    );
    return sha256Hasher.update(message).digest("hex");
  };

  static readonly encryptAES256 = <T>(
    request: T,
    initVector: string,
    passPhrase: string,
    saltValue: string,
  ): string => {
    try {
      if (!initVector || !passPhrase || !saltValue) {
        throw new Error("Encryption configuration missing");
      }

      const ivBuffer = Buffer.from(initVector, "ascii"); // Match .NET ASCII
      if (ivBuffer.length !== SecurityUtil.IV_LENGTH) {
        throw new Error("IV must be exactly 16 bytes");
      }

      const saltBuffer = Buffer.from(saltValue, "ascii"); // Match .NET ASCII
      const key = crypto.pbkdf2Sync(
        passPhrase,
        saltBuffer,
        SecurityUtil.PBKDF2_ITERATIONS,
        SecurityUtil.KEY_LENGTH,
        SecurityUtil.PBKDF2_DIGEST, // Use SHA1 to match .NET
      );

      const cipher = crypto.createCipheriv("aes-256-cbc", key, ivBuffer);
      const clearText = JSON.stringify(request);

      let encrypted = cipher.update(clearText, "utf8", "base64");
      encrypted += cipher.final("base64");

      return encrypted;
    } catch (ex: any) {
      console.error(`Encryption error: ${ex.message}`);
      throw new Error("Encryption failed");
    }
  };

  static readonly decryptAES256 = async (
    encryptedText: string,
    initVector: string,
    passPhrase: string,
    saltValue: string,
  ): Promise<string> => {
    try {
      if (!initVector || !passPhrase || !saltValue) {
        throw new Error("Decryption configuration missing");
      }

      const ivBuffer = Buffer.from(initVector, "ascii"); // Match .NET
      if (ivBuffer.length !== SecurityUtil.IV_LENGTH) {
        throw new Error("IV must be exactly 16 bytes");
      }

      const saltBuffer = Buffer.from(saltValue, "ascii"); // Match .NET
      const key = await crypto.pbkdf2Sync(
        passPhrase,
        saltBuffer,
        SecurityUtil.PBKDF2_ITERATIONS,
        SecurityUtil.KEY_LENGTH,
        SecurityUtil.PBKDF2_DIGEST, // Use SHA1 to match .NET
      );

      const decipher = await crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        ivBuffer,
      );

      let decrypted = await decipher.update(encryptedText, "base64", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    } catch (ex: any) {
      console.error(`Decryption error: ${ex.message}`);

      if (ex.message.includes("Invalid key length")) {
        throw new Error("Invalid encryption key");
      }
      if (ex.message.includes("Invalid IV length")) {
        throw new Error("Invalid IV");
      }
      if (ex.message.includes("Invalid input")) {
        throw new Error("Invalid encrypted input");
      }

      throw new Error("Decryption failed");
    }
  };

  static readonly encryptionAes = (
    data: string,
    secret: string,
    iv: string,
    algo: string,
  ) => {
    try {
      // const key=new Buffer(process.env.AES_SECRET,"base64").toString("base64");
      const cipher = crypto.createCipheriv(algo, secret, iv);
      let crypted = cipher.update(data, "utf8", "hex"); // hex , hex
      crypted += cipher.final("hex");
      return crypted;
      //     const cipher = crypto.createCipheriv("aes-128-ecb", process.env.AES_SECRET,null);
      //     let encrpted= Buffer.concat([cipher.update(data), cipher.final()]).toString(outputEncoding);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  static readonly decryptionAes = (
    data: string,
    secret: string,
    iv: string,
    algo: string,
  ) => {
    try {
      const decrypter = crypto.createDecipheriv(algo, secret, iv);
      let decryptedMsg = decrypter.update(data, "hex", "utf8");
      decryptedMsg += decrypter.final("utf8");
      console.log("Decrypted message: " + decryptedMsg);
      return decryptedMsg;
    } catch (error: any) {
      console.log("decryptionAes error: ", error);
      throw error;
    }
  };

  /* Encryption Method */
  static readonly encrypt = (
    plainText: string,
    secret: string,
    iv: string,
  ): string => {
    try {
      // Generate random IV
      // const iv = crypto.randomBytes(SecurityUtil.GCM_IV_LENGTH);

      // Create Cipher instance
      const cipher = crypto.createCipheriv("aes-256-gcm", secret, iv);

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
    } catch (error: any) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  };

  /* Decryption Method */
  static readonly decrypt = (
    cipherText: string,
    secret: string,
    iv: string,
  ): string => {
    try {
      // Decode the base64-encoded cipherText
      const decoded = Buffer.from(cipherText, "base64");

      // Extract the IV, encryptedText, and authTag from the decoded Buffer
      //  const iv = decoded.slice(0, this.GCM_IV_LENGTH);
      const encryptedText = decoded.slice(
        SecurityUtil.GCM_IV_LENGTH,
        decoded.length - SecurityUtil.GCM_TAG_LENGTH,
      );
      const authTag = decoded.slice(
        decoded.length - SecurityUtil.GCM_TAG_LENGTH,
      );

      // Create Decipher instance
      const decipher = crypto.createDecipheriv("aes-256-gcm", secret, iv);

      // Set the authentication tag
      decipher.setAuthTag(authTag);

      // Decrypt the encryptedText
      const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);

      // Return the decrypted text as UTF-8
      return decryptedText.toString("utf8");
    } catch (error: any) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  };

  // Encryption for payload
  static readonly encryptUserData = (
    data: any,
    appKey: string,
    appIVKey: string,
  ): string => {
    const transformedData = JSON.stringify(data);
    // If using 'crypto-js', require it at the top: const CryptoJS = require('crypto-js');
    const key = CryptoJS.enc.Utf8.parse(appKey);
    const iv = CryptoJS.enc.Utf8.parse(appIVKey);
    const encrypted = CryptoJS.AES.encrypt(transformedData, key, { iv: iv });
    return encrypted.toString(); // returns base64 string
  };

  // Decryption for payload
  static readonly decryptUserData = (
    data: string,
    appKey: string,
    appIVKey: string,
  ): any => {
    const key = CryptoJS.enc.Utf8.parse(appKey);
    const iv = CryptoJS.enc.Utf8.parse(appIVKey);
    const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  };
}

function getAlgorithm(key: any) {
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
  }

  throw new Error("Invalid key length: " + key.length);
}
