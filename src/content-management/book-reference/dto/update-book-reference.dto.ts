import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class UpdateBookReferenceDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the book",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد عنوان کتاب اجباری است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
