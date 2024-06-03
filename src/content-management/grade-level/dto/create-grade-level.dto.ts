import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";
export class CreateGradeLevelDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th grade level",
    example: "second",
  })
  @IsNotEmpty({ message: "فیلد عنوان پایه تحصیلی است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;

  @ApiProperty({
    description: "Description of th grade level",
    example: "description",
  })
  @Length(3, 5000, {
    message: "توضیحات پایه تحصیلی باید بین ۳ تا ۵۰۰۰ حرف باشد",
  })
  readonly description: string;

  @ApiProperty({ type: "string", format: "binary" })
  public image: any;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
