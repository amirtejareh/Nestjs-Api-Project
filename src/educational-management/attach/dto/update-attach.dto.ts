import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAttachDto } from "./create-attach.dto";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";

export class UpdateAttachDto extends PartialType(CreateAttachDto) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly chapter?: Chapter;
  readonly type: ["summary", "attaches", "tables"];
  readonly videos?: IVideo[];
  @ApiProperty({ type: "string", format: "binary" })
  public pdfFiles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
