import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";

export type AttachDocument = Attach & Document;

@Schema({ timestamps: true })
export class Attach {
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
    required: true,
    enum: ["summary", "attaches", "tables"],
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

export const AttachSchema = SchemaFactory.createForClass(Attach);
