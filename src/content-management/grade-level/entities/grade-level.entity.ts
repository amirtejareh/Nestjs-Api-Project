import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type GradeLevelDocument = GradeLevel & Document;

@Schema({ timestamps: true })
export class GradeLevel {
  @Prop({ required: true })
  title: string;
}

export const GradeLevelSchema = SchemaFactory.createForClass(GradeLevel);
