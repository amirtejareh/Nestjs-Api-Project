import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";
import { User } from "../../../users/entities/user.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";

interface IUserAnswers {
  number: number;
  answerResult: string;
  correctAnswer: number;
  userAnswer: number;
}

export type OnlineGradeReportDocument = OnlineGradeReport & Document;

@Schema({ timestamps: true })
export class OnlineGradeReport {
  @Prop()
  user: User;

  @Prop({ required: true })
  userAnswers: IUserAnswers[];

  @Prop({ required: true })
  examNumber: number;

  @Prop({ required: true })
  examType: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: ObjectiveTest.name }],
  })
  objectiveTests: ObjectiveTest;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({ required: false })
  totalQuestions: number;
  @Prop({ required: false })
  correctCount: number;
  @Prop({ required: false })
  incorrectCount: number;
  @Prop({ required: false })
  unansweredCount: number;
}

export const OnlineGradeReportSchema =
  SchemaFactory.createForClass(OnlineGradeReport);
