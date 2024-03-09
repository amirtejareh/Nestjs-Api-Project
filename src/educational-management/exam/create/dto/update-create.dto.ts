import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCreateExamDto } from "./create-create.dto";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";

export class UpdateCreateExamDto extends PartialType(CreateCreateExamDto) {
  readonly _id?: string;
  readonly type?: string;
  readonly gradeLevel?: GradeLevel;
  public AnswerSheetSourcePdfFile: string[];
  readonly book?: Book;
  readonly chapterTerm?: Chapter | TermOfStudy;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
