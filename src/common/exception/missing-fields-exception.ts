import { HttpException, HttpStatus } from "@nestjs/common";

export class MissingFieldsException extends HttpException {
  constructor(fieldName: string) {
    super(
      `Missing required string field: ${fieldName}`,
      HttpStatus.BAD_REQUEST
    );
  }
}
