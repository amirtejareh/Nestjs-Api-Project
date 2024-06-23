import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { IVideo } from "../../../interface/IEntity";

export type ContentEducationalPricingDocument = ContentEducationalPricing &
  Document;

@Schema({ timestamps: true })
export class ContentEducationalPricing {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  book: Book;

  @Prop({
    required: true,
  })
  price: number;
}

export const ContentEducationalPricingSchema = SchemaFactory.createForClass(
  ContentEducationalPricing
);
