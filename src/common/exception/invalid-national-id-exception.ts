import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidNationalIdException extends HttpException {
  constructor() {
    super(`Invalid national id exception`, HttpStatus.BAD_REQUEST);
  }
}
