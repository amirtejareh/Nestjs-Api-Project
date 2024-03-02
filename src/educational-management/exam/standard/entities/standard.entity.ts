import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";
export type StandardDocument = Standard & Document;

export class Standard {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Chapter.name }],
  })
  chapter: Chapter;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  term: TermOfStudy;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  options: string[];
}

export const StandardSchema = SchemaFactory.createForClass(Standard);
