import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { BookReference } from "../../book-reference/entities/book-reference.entity";

export type BookDocument = Book & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Book {
  [x: string]: any;
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: BookReference.name }],
  })
  bookReference: BookReference[];

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.virtual("chapters", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "books",
});
