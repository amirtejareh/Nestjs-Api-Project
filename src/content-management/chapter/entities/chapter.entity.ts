import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";

export type ChapterDocument = Chapter & Document;

@Schema({ timestamps: true })
export class Chapter {
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
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
