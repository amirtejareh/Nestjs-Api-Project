import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";
export class CreateGradeLevelDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of th grade level",
    example: "second",
  })
  @IsNotEmpty({ message: "فیلد عنوان پایه تحصیلی است" })
  @Length(3, 20, { message: "عنوان پایه تحصیلی باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly books?: Book[];
  readonly terms?: TermOfStudy[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
