import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";

export type BookReferenceDocument = BookReference & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class BookReference {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
}

export const BookReferenceSchema = SchemaFactory.createForClass(BookReference);
