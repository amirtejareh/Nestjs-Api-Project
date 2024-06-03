import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";
export class CreateSectionDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the section",
    example: "section 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان بخش اجباری است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly books: Book[];
  readonly chapters: Chapter[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
