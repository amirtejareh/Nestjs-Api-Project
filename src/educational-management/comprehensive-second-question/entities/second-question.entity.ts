import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { ComprehensiveTest } from "../../comprehensive-test/entities/comprehensive-test.entity";
import { PrimaryQuestion } from "../../comprehensive-primary-question/entities/primary-question.entity";

export type SecondQuestionDocument = SecondQuestion & Document;

@Schema({ timestamps: true })
export class SecondQuestion {
  @Prop({
    type: [
      { type: mongooseSchema.Types.ObjectId, ref: ComprehensiveTest.name },
    ],
  })
  comprehensiveTestId: ComprehensiveTest;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: PrimaryQuestion.name }],
  })
  primaryQuestionId: PrimaryQuestion;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  options: string[];

  @Prop({ required: true })
  answersheet: string;
}

export const SecondQuestionSchema =
  SchemaFactory.createForClass(SecondQuestion);
