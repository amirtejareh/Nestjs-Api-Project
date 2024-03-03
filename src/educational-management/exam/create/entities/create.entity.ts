import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";

export type CreateExamDocument = CreateExam & Document;

@Schema({ timestamps: true })
export class CreateExam {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel?: GradeLevel;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books?: Book;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Chapter.name }],
  })
  chapter: Chapter;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  term: TermOfStudy;
  @Prop({
    required: true,
    enum: ["standard", "subjective"],
  })
  type: string;

  @Prop({
    required: true,
    default: false,
  })
  isPublished?: boolean;
}

export const CreateExamSchema = SchemaFactory.createForClass(CreateExam);
