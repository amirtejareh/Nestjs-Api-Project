import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
