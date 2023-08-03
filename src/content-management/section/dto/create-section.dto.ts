import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";
export class CreateSectionDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the chapter",
    example: "Chapter 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان فصل اجباری است" })
  @Length(3, 20, { message: "عنوان فصل باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly books: Book[];
  readonly chapters: Chapter[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
