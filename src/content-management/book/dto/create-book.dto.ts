import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateBookDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the book",
    example: "Math",
  })
  @IsNotEmpty({ message: "فیلد عنوان کتاب اجباری است" })
  @Length(3, 20, { message: "عنوان کتاب باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;

  @ApiProperty({ type: "string", format: "binary" })
  public image: any;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
