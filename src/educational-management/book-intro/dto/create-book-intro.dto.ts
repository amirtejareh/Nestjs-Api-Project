import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { IVideo } from "../../../interface/IEntity";

export class CreateBookIntroDto {
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
    description: "type ",
    example: [
      "bookDescription",
      "bookInEntranceExam",
      "bookInFinalExam",
      "bookReview",
    ],
  })
  readonly type: [
    "bookDescription",
    "bookInEntranceExam",
    "bookInFinalExam",
    "bookReview"
  ];

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
