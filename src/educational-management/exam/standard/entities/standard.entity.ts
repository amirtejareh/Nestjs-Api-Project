import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { CreateExam } from "../../create/entities/create.entity";

export type StandardDocument = Standard & Document;
@Schema({ timestamps: true })
export class Standard {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: CreateExam.name }],
  })
  createExam: CreateExam;

  @Prop({
    required: true,
    default: false,
  })
  isMultipleChoiceTest?: boolean;

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
