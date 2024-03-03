import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StandardDocument = Standard & Document;

export class Standard {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  options: string[];
}

export const StandardSchema = SchemaFactory.createForClass(Standard);
