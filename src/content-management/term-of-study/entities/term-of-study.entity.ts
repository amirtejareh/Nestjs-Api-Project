import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TermOfStudyDocument = TermOfStudy & Document;

@Schema({ timestamps: true })
export class TermOfStudy {
  @Prop({ required: true })
  title: string;
}

export const TermOfStudySchema = SchemaFactory.createForClass(TermOfStudy);
