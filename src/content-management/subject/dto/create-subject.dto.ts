import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class CreateSubjectDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the subject",
    example: "Subject 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان موضوع اجباری است" })
  @Length(3, 20, { message: "عنوان موضوع باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly chapters: Chapter[];
  readonly books: Book[];
  readonly terms: TermOfStudy[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
