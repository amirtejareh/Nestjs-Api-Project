import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { CreateSectionDto } from "./create-section.dto";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  readonly _id?: string;
  @ApiProperty({
    description: "Title of the section",
    example: "section 1",
  })
  @IsNotEmpty({ message: "فیلد عنوان بخش اجباری است" })
  @Length(3, 20, { message: "عنوان بخش باید بین ۳ تا ۲۰ حرف باشد" })
  readonly title: string;
  readonly gradeLevels: GradeLevel[];
  readonly books: Book[];
  readonly chapters: Chapter[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
