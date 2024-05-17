import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateComprehensiveTestDto } from "./create-comprehensive-test.dto";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";

export class UpdateComprehensiveTestDto extends PartialType(
  CreateComprehensiveTestDto
) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly chapter?: Chapter;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
