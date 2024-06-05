import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";

export type NewsDocument = News & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    required: true,
    default: false,
  })
  isPublished: boolean;

  @Prop({ required: false })
  image: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
