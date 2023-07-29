import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../book/entities/book.entity";

export type TermOfStudyDocument = TermOfStudy & Document;

@Schema({ timestamps: true })
export class TermOfStudy {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  books: Book[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  terms: TermOfStudy[];
}

export const TermOfStudySchema = SchemaFactory.createForClass(TermOfStudy);
