import { HttpException } from "@nestjs/common";

export class ResponseException extends HttpException {
  constructor(response: any) {
    super(response.message, response.httpStatus, {
      description: response.responseCode,
      cause: response.data,
    });
  }
}
