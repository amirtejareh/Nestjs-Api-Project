import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";

export type GradeLevelDocument = GradeLevel & Document;

@Schema({ timestamps: true })
export class GradeLevel {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  terms: TermOfStudy[];
}

export const GradeLevelSchema = SchemaFactory.createForClass(GradeLevel);
