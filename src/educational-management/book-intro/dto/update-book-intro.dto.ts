import { ApiProperty, PartialType } from "@nestjs/swagger";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { IVideo } from "../../../interface/IEntity";
import { CreateBookIntroDto } from "./create-book-intro.dto";

export class UpdateBookIntroDto extends PartialType(CreateBookIntroDto) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly type: [
    "bookDescription",
    "bookInEntranceExam",
    "bookInFinalExam",
    "bookReview"
  ];
  readonly videos?: IVideo[];
  @ApiProperty({ type: "string", format: "binary" })
  public pdfFiles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
