import { ArgumentsHost, Catch, HttpStatus, Logger } from "@nestjs/common";
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";
import { QueryFailedError } from "typeorm";
import { GENERIC_RESPONSE_STATUS } from "../enums/common.enum";
import Bugsnag from "@bugsnag/js";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly logger: Logger
  ) {
    super(adapterHost.httpAdapter);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Default error details
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Operation Failed";
    let data = null;

    this.logger.error(`AllExceptionsFilter :: exception ${exception} `);

    status = this.getStatus(exception);
    message = this.getMessage(exception);

    if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message =
        "A unexpected error occurred. Please try again later or contact support.";
    }

    if (exception.status === HttpStatus.UNPROCESSABLE_ENTITY) {
      console.log("422 exception");
      console.log(exception?.response?.message);
      status = HttpStatus.UNPROCESSABLE_ENTITY;

      // const constraints = exception.response?.message?.[0]?.constraints;
      // const value = Object.values(constraints)[0];

      data = exception.response?.message;
      message = "Request could not be processed!";
    }

    if (
      message?.toLowerCase().includes("cannot read properties of undefined")
    ) {
      //TODO - report this bug on bugsnag.
      message =
        "Unable to process this request. The team is working to fix this.";
      status = HttpStatus.BAD_REQUEST;
    }

    Bugsnag.notify(exception, (event) => {
      event.addMetadata("path", ctx.getRequest()?.url);
    });

    let failureStatusCode = GENERIC_RESPONSE_STATUS.FAILED;

    if (status.toString() === "417") {
      failureStatusCode = GENERIC_RESPONSE_STATUS.INVALID;
    } else if (status.toString() === "409") {
      failureStatusCode = GENERIC_RESPONSE_STATUS.CONFLICT;
    } else {
      failureStatusCode = GENERIC_RESPONSE_STATUS.FAILED;
    }

    response.status(status === 403 ? 401 : status).json({
      statusCode: failureStatusCode,
      message,
      data: data || exception?.options?.cause || null,
    });
  }

  private getStatus(exception: any): HttpStatus {
    // Handle known HTTP exceptions and provide defaults for unknowns
    switch (exception?.status || exception?.statusCode) {
      case HttpStatus.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case HttpStatus.SERVICE_UNAVAILABLE:
        return HttpStatus.SERVICE_UNAVAILABLE;
      case HttpStatus.NOT_ACCEPTABLE:
        return HttpStatus.NOT_ACCEPTABLE;
      case HttpStatus.EXPECTATION_FAILED:
        return HttpStatus.EXPECTATION_FAILED;
      case HttpStatus.BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;
      case HttpStatus.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case HttpStatus.CONFLICT:
        return HttpStatus.CONFLICT;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return HttpStatus.UNPROCESSABLE_ENTITY;
      case HttpStatus.FORBIDDEN:
        return HttpStatus.FORBIDDEN;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR; // Fallback for unknown errors
    }
  }

  private getMessage(exception: any): string {
    // Handle known error types/messages gracefully
    if (exception instanceof QueryFailedError) {
      return "An unexpected error occurred. Please try again later or contact support.";
    }

    // Handle rate limiting errors (example: ThrottlerException)
    if (exception.message === "ThrottlerException: Too Many Requests") {
      return "You have attempted this operation too many times. Kindly wait a little and try again!";
    }

    if (exception.message === "Forbidden resource") {
      return "You may not have the required role to do this";
    }

    if (exception.message === "Invalid token") {
      return "Session timed out! Please login again";
    }

    if (exception.message === "Forbidden resource") {
      return "You may not have the required role to do this";
    }

    if (exception.message === "Invalid Token") {
      return "Session timed out! Please login again";
    }

    // Extract message from nested exception structure or provide a fallback
    return (
      exception?.message ||
      exception?.response?.message ||
      exception?.message?.error ||
      exception?.toString() ||
      "Operation Failed"
    );
  }
}
