import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";

export class CreateComprehensiveTestDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Grade level id",
    example: "64d5513027862ad356480ff0",
  })
  readonly gradeLevel: GradeLevel;

  @ApiProperty({
    description: "Book id",
    example: "64d5513027862ad356480ff0",
  })
  readonly book: Book;

  @ApiProperty({
    description: "Chapter id",
    example: "64d5513027862ad356480ff0",
  })
  readonly chapter: Chapter;
}
