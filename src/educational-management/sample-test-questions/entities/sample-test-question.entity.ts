import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { IVideo } from "../../../interface/IEntity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { TermOfStudy } from "../../../content-management/term-of-study/entities/term-of-study.entity";
export type SampleTestQuestionsDocument = SampleTestQuestions & Document;

@Schema({ timestamps: true })
export class SampleTestQuestions {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  book: Book;

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
    enum: ["authorship", "general"],
  })
  type: string;

  @Prop({
    required: true,
  })
  videos: IVideo[];

  @Prop({
    required: true,
  })
  pdfFiles: { title: string; link: string }[];
}

export const SampleTestQuestionsSchema =
  SchemaFactory.createForClass(SampleTestQuestions);
