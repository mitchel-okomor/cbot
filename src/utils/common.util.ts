import parsePhoneNumber from "libphonenumber-js";
import { IPaginatedRes } from "../interfaces";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

import * as JWT from "jsonwebtoken";
import moment from "moment-timezone";
import { ResourceTypes } from "src/enums";
import { randomInt } from "crypto";

export class CommonUtil {
  static getError(error: any): any {
    return (
      error?.message ||
      error?.response?.message ||
      error?.response?.data ||
      error?.message?.error ||
      error
    );
  }

  static validateEmail(email: string) {
    const pattern = /^[^\+]+@[^\+]+\.[^\+]+$/;
    return pattern.test(email);
  }

  static formatPhoneNumber(phoneNumber: string): {
    countryCode?: string;
    number?: string;
  } {
    try {
      if (!phoneNumber) {
        return { countryCode: null, number: null };
      }

      if (!phoneNumber.startsWith("+")) {
        phoneNumber = "+".concat(phoneNumber);
      }

      const formattedPhoneNumber = parsePhoneNumber(phoneNumber?.trim());

      if (formattedPhoneNumber) {
        return {
          countryCode: formattedPhoneNumber.country,
          number: formattedPhoneNumber.number,
        };
      }

      return { countryCode: null, number: null };
    } catch (error) {
      console.error("formatPhoneNumber \n %o", error);
      return { countryCode: null, number: null };
    }
  }

  static isValueTruthyOrZero = (value: any): boolean => {
    if (value || value === 0) return true;
    return false;
  };

  static getMediaTypeAndExtension(url: string): {
    type: string;
    extension: string;
  } {
    if (!url) {
      return { type: "unknown", extension: "unknown" };
    }

    const extensionPattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const match = url.match(extensionPattern);

    if (!match) {
      return { type: "unknown", extension: "unknown" };
    }

    const extension = match[1].toLowerCase();
    let type;

    switch (extension) {
      case "mp4":
      case "avi":
      case "mov":
      case "webm":
      case "mkv":
        type = "video";
        break;
      case "mp3":
      case "wav":
      case "aac":
        type = "audio";
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
      case "webp":
        type = "image";
        break;
      case "pdf":
      case "doc":
      case "docx":
        type = "document";
        break;
      default:
        type = "unknown";
    }

    return { type, extension };
  }

  public static isValidNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  static paginate = (
    data: any[],
    total: number,
    perPage: number,
    pageNumber: number,
    meta?: Record<string, any>,
  ): IPaginatedRes => {
    return {
      data,
      pagination: {
        total,
        perPage,
        pageNumber,
        pageSize: data.length,
      },
      meta,
    };
  };

  static validateTime(
    startTime?: { date: Date; referenceName?: string },
    endTime?: { date: Date; referenceName?: string },
  ) {
    const startTimeReferenceName = startTime?.referenceName || "Start Time";
    const endTimeReferenceName = endTime?.referenceName || "End Time";

    // validate start time
    if (startTime?.date) {
      if (moment(startTime.date).isBefore(moment(), "day")) {
        throw new HttpException(
          `${startTimeReferenceName} cannot be in the past`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // validate end time
    if (endTime?.date) {
      if (moment(endTime.date).isBefore(moment())) {
        throw new HttpException(
          `${endTimeReferenceName} cannot be in the past`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // validate both start time and end time
    if (endTime?.date && startTime?.date) {
      if (moment(endTime.date).isBefore(moment(startTime.date))) {
        throw new HttpException(
          `${endTimeReferenceName} cannot be before ${startTimeReferenceName}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  static generateToken = async (
    data: Record<string, any>,
    expiresIn: string,
    secretKey: string,
  ): Promise<string> => {
    const key = secretKey;
    const expire = expiresIn;
    return JWT.sign(data, key, { expiresIn: expire });
  };

  static verifyToken = async (
    token: string,
    secretKey?: string,
  ): Promise<any> => {
    return JWT.verify(token, secretKey);
  };

  static slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  static concatenateObjectValues(obj) {
    let result = "";

    // Helper function to recursively concatenate values
    function traverse(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (typeof value === "object" && value !== null) {
            traverse(value); // Recursively traverse nested objects
          } else if (Array.isArray(value)) {
            value.forEach((item) => traverse(item)); // Recursively traverse arrays
          } else {
            result += `${value} `;
          }
        }
      }
    }

    traverse(obj);
    return CommonUtil.slugify(result.trim()); // Trim any leading or trailing whitespace
  }

  public static resolveStringTime = (
    timeRepresentation: string,
  ): { startDateTime: Date; endDateTime: Date } => {
    const momentDate = moment.utc(new Date());

    const periods: Record<
      string,
      () => { startDateTime: Date; endDateTime: Date }
    > = {
      today: () => ({
        startDateTime: momentDate.clone().startOf("day").toDate(),
        endDateTime: momentDate.clone().endOf("day").toDate(),
      }),
      yesterday: () => ({
        startDateTime: momentDate
          .clone()
          .subtract(1, "day")
          .startOf("day")
          .toDate(),
        endDateTime: momentDate
          .clone()
          .subtract(1, "day")
          .endOf("day")
          .toDate(),
      }),
      this_week: () => ({
        startDateTime: momentDate.clone().startOf("week").toDate(),
        endDateTime: momentDate.clone().endOf("week").toDate(),
      }),
      last_week: () => ({
        startDateTime: momentDate
          .clone()
          .subtract(1, "week")
          .startOf("week")
          .toDate(),
        endDateTime: momentDate
          .clone()
          .subtract(1, "week")
          .endOf("week")
          .toDate(),
      }),
      this_month: () => ({
        startDateTime: momentDate.clone().startOf("month").toDate(),
        endDateTime: momentDate.clone().endOf("month").toDate(),
      }),
      last_month: () => ({
        startDateTime: momentDate
          .clone()
          .subtract(1, "month")
          .startOf("month")
          .toDate(),
        endDateTime: momentDate
          .clone()
          .subtract(1, "month")
          .endOf("month")
          .toDate(),
      }),
      this_year: () => ({
        startDateTime: momentDate.clone().startOf("year").toDate(),
        endDateTime: momentDate.clone().endOf("year").toDate(),
      }),
      last_year: () => ({
        startDateTime: momentDate
          .clone()
          .subtract(1, "year")
          .startOf("year")
          .toDate(),
        endDateTime: momentDate
          .clone()
          .subtract(1, "year")
          .endOf("year")
          .toDate(),
      }),
    };

    if (periods[timeRepresentation]) {
      return periods[timeRepresentation]();
    }

    // Fallback to parse duration if timeRepresentation doesn't match predefined values
    return this.parseDuration(timeRepresentation);
  };

  public static parseDuration = (
    duration: string,
  ): { startDateTime: Date; endDateTime: Date } => {
    const durationRegex = /^(\d+)([dmywh])$/i;
    const match = duration?.match(durationRegex);

    if (!match) {
      throw new Error("Invalid duration format");
    }
    const [, amountStr, unitChar] = match;

    const amount = parseInt(amountStr, 10);

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Duration must be a positive number");
    }

    const unitMap: Record<string, moment.unitOfTime.DurationConstructor> = {
      m: "months",
      d: "days",
      w: "weeks",
      y: "years",
      h: "hours",
    };

    const unit = unitMap[unitChar.toLowerCase()];
    if (!unit) {
      throw new Error("Invalid duration unit");
    }

    const now = moment.utc();
    if (unit === "days" && amount === 1) {
      return {
        startDateTime: now.clone().startOf("day").toDate(),
        endDateTime: now.clone().endOf("day").toDate(),
      };
    }
    return {
      startDateTime: now.clone().subtract(amount, unit).startOf("day").toDate(),
      endDateTime: now.clone().endOf("day").toDate(),
    };
  };

  public static capitalizeFirstLetterOfEachWord = (value: string): string => {
    return value
      ?.trim()
      ?.split(" ")
      ?.map(
        (word) => word.charAt(0)?.toUpperCase() + word.slice(1)?.toLowerCase(),
      )
      ?.join(" ");
  };

  public static moneyFormat(value: number): string {
    if (!value) return "0";
    if (isNaN(value)) return value?.toString();

    return Number(value)
      ?.toFixed(2)
      ?.toString()
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public static sortObjectKeys(obj: Record<string, any>): Record<string, any> {
    return Object.keys(obj)
      .sort()
      .reduce(
        (sortedObj, key) => {
          sortedObj[key] = obj[key];
          return sortedObj;
        },
        {} as Record<string, any>,
      );
  }

  public static validateStoreIdentity(identity: string): boolean {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_\-+]*$/;
    if (!pattern.test(identity)) {
      return false;
    }
    return true;
  }

  static isFailure = (status: string): boolean => {
    return !(status === "00" || status === "03");
  };

  static resolveDateRange(
    startDate?: Date,
    endDate?: Date,
    time?: string,
  ): { start: Date; end: Date } {
    if (startDate && endDate) {
      return { start: startDate, end: endDate };
    } else if (time) {
      const { startDateTime, endDateTime } = CommonUtil.resolveStringTime(time);
      return { start: startDateTime, end: endDateTime };
    }
    throw new BadRequestException(
      "Invalid date range: Provide either startDate and endDate or a valid time range.",
    );
  }

  static generateReference(prefix: string): string {
    const uniquePart =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    return `${prefix}-${uniquePart}`;
  }

  static resolveFileType = (extName) => {
    let resource_type;

    const isImage = [".jpg", ".jpeg", ".png", ".gif"].includes(
      extName.toLowerCase(),
    );
    const isVideo = [".mp4", ".mov", ".webm"].includes(extName.toLowerCase());

    if (isImage) {
      resource_type = ResourceTypes.IMAGE;
    }

    if (isVideo) {
      resource_type = ResourceTypes.VIDEO;
    }

    return resource_type;
  };

  static getRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  static randomInt = (length = 4): number => {
    const min = Math.pow(10, length - 1); // Smallest n-digit number
    const max = Math.pow(10, length) - 1; // Largest n-digit number
    return CommonUtil.getRandomInteger(min, max);
  };

  static isProd = (): boolean => {
    return (
      process.env.APP_ENV === "production" || process.env.APP_ENV === "prod"
    );
  };

  static randomString(
    length: number,
    chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  ) {
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    return result;
  }

  static randomAlphanumericString(length: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return this.randomString(length, chars);
  }

  static generateTransactionReference = (prefix?: string) => {
    return `${prefix ?? "PP"}_${Date.now()}_${randomInt(15)}`;
  };

  static convertToSmallestUnit = (amount, currency) => {
    const currencies = [
      "USD",
      "AED",
      "AFN*",
      "ALL",
      "AMD",
      "ANG",
      "AOA*",
      "ARS*",
      "AUD",
      "AWG",
      "AZN",
      "BAM",
      "BBD",
      "BDT",
      "BGN",
      "BIF",
      "BMD",
      "BND",
      "BOB*",
      "RL*",
      "BSD",
      "BWP",
      "BYN",
      "BZD",
      "CAD",
      "CDF",
      "CHF",
      "CLP*",
      "CNY",
      "COP*",
      "CRC*",
      "CVE*",
      "CZK",
      "DJF*",
      "DKK",
      "DOP",
      "DZD",
      "EGP",
      "ETB",
      "EUR",
      "FJD",
      "FKP*",
      "GBP",
      "GEL",
      "GIP",
      "GMD",
      "GNF*",
      "GTQ*",
      "GYD",
      "HKD",
      "HNL*",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "ISK",
      "JMD",
      "JPY",
      "KES",
      "KGS",
      "KHR",
      "KMF",
      "KRW",
      "KYD",
      "KZT",
      "LAK*",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "MAD",
      "MDL",
      "MGA",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MRO",
      "MUR*",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "MZN",
      "NAD",
      "NGN",
      "NIO*",
      "NOK",
      "NPR",
      "NZD",
      "PAB*",
      "PEN*",
      "PGK",
      "PHP",
      "PKR",
      "PLN",
      "PYG*",
      "QAR",
      "RON",
      "RSD",
      "RUB",
      "RWF",
      "SAR",
      "SBD",
      "SCR",
      "SEK",
      "SGD",
      "SHP*",
      "SLE",
      "SLL",
      "SOS",
      "SRD*",
      "STD*",
      "SZL",
      "THB",
      "TJS",
      "TOP",
      "TRY",
      "TTD",
      "TWD",
      "TZS",
      "UAH",
      "UGX",
      "UYU*",
      "UZS",
      "VND",
      "VUV",
      "WST",
      "XAF",
      "XCD",
      "XOF*",
      "XPF*",
      "YER",
      "ZAR",
      "ZMW",
    ];
    if (currencies.includes(currency.toLocaleUpperCase())) {
      return amount * 100;
    } else {
      return amount;
    }
  };
}
