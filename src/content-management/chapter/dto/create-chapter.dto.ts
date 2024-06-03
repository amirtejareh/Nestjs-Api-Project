import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";

export class CreateChapterDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the chapter",
    example: "Chapter 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان فصل اجباری است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly books: Book[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
