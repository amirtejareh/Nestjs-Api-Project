import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidNationalIdException extends HttpException {
  constructor() {
    super(`کد ملی وارد شده صحیح نیست`, HttpStatus.BAD_REQUEST);
  }
}
