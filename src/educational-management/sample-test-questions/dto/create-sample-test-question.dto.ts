import { ApiProperty } from "@nestjs/swagger";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { IVideo } from "../../../interface/IEntity";
import { TermOfStudy } from "../../../content-management/term-of-study/entities/term-of-study.entity";

export class CreateSampleTestQuestionsDto {
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
    description: "Chapter Or Term id",
    example: "64d5513027862ad356480ff0",
  })
  readonly chapterTerm: Chapter | TermOfStudy;

  @ApiProperty({
    description: "type ",
    example: ["authorship", "general"],
  })
  readonly type: ["authorship", "general"];

  @ApiProperty({
    description: "List of video object",
    example: `{"title": "", "link": '#'}`,
  })
  readonly videos: IVideo[];

  @ApiProperty({ type: "string", format: "binary" })
  public pdfFiles: any;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
