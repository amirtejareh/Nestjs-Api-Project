import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";

export type PrimaryQuestionDocument = PrimaryQuestion & Document;

@Schema({ timestamps: true })
export class PrimaryQuestion {
  @Prop({
    type: [
      { type: mongooseSchema.Types.ObjectId, ref: ComprehensiveTest.name },
    ],
  })
  comprehensiveTestId: ComprehensiveTest;

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  questionNumber: number;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  options: string[];

  @Prop({ required: true })
  guideLine: string;
}

export const PrimaryQuestionSchema =
  SchemaFactory.createForClass(PrimaryQuestion);
