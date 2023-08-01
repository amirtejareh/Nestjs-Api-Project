import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../book/entities/book.entity";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";

export type TermOfStudyDocument = TermOfStudy & Document;

@Schema({ timestamps: true })
export class TermOfStudy {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book[];
}

export const TermOfStudySchema = SchemaFactory.createForClass(TermOfStudy);
