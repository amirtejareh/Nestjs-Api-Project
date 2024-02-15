import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateSampleTestQuestionsDto } from "./create-sample-test-question.dto";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { IVideo } from "../../../interface/IEntity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { TermOfStudy } from "../../../content-management/term-of-study/entities/term-of-study.entity";

export class UpdateSampleTestQuestionsDto extends PartialType(
  CreateSampleTestQuestionsDto
) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly chapterTerm?: Chapter | TermOfStudy;
  readonly type: ["authorship", "general"];
  readonly videos?: IVideo[];
  @ApiProperty({ type: "string", format: "binary" })
  public pdfFiles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
