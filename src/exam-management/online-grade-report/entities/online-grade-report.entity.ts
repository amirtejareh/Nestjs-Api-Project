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

  @Prop({ required: false })
  easyCount: number;
  @Prop({ required: false })
  averageCount: number;
  @Prop({ required: false })
  hardCount: number;
  @Prop({ required: false })
  correctEasyCount: number;
  @Prop({ required: false })
  correctAverageCount: number;
  @Prop({ required: false })
  correctHardCount: number;

  @Prop({ required: false })
  incorrectEasyCount: number;
  @Prop({ required: false })
  incorrectAverageCount: number;
  @Prop({ required: false })
  incorrectHardCount: number;
  @Prop({ required: false })
  unansweredEasyCount: number;
  @Prop({ required: false })
  unansweredAverageCount: number;
  @Prop({ required: false })
  unansweredHardCount: number;

  @Prop({ required: false })
  unansweredChallengingCount: number;
  @Prop({ required: false })
  incorrectChallengingCount: number;
  @Prop({ required: false })
  correctChallengingCount: number;
  @Prop({ required: false })
  challengingCount: number;
  @Prop({ required: false })
  unansweredMemorizationalCount: number;
  @Prop({ required: false })
  incorrectMemorizationalCount: number;
  @Prop({ required: false })
  correctMemorizationalCount: number;
  @Prop({ required: false })
  memorizationalCount: number;
  @Prop({ required: false })
  unansweredTrickCount: number;
  @Prop({ required: false })
  incorrectTrickCount: number;
  @Prop({ required: false })
  correctTrickCount: number;
  @Prop({ required: false })
  trickCount: number;
  @Prop({ required: false })
  unansweredComputationalCount: number;
  @Prop({ required: false })
  incorrectComputationalCount: number;
  @Prop({ required: false })
  correctComputationalCount: number;
  @Prop({ required: false })
  computationalCount: number;
  @Prop({ required: false })
  unansweredConceptionalCount: number;
  @Prop({ required: false })
  incorrectConceptionalCount: number;
  @Prop({ required: false })
  correctConceptionalCount: number;
  @Prop({ required: false })
  conceptionalCount: number;
}

export const OnlineGradeReportSchema =
  SchemaFactory.createForClass(OnlineGradeReport);
