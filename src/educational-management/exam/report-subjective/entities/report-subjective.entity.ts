import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { User } from "../../../../users/entities/user.entity";

export type ReportSubjectiveDocument = ReportSubjective & Document;
interface IUserAnswers {
  number: number;
  answerResult: string;
  correctAnswer: number;
  userAnswer: number;
}

@Schema({ timestamps: true })
export class ReportSubjective {
  @Prop()
  user: User;
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel?: GradeLevel;
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  book?: Book;
  @Prop({ required: true })
  userAnswers: IUserAnswers[];
  @Prop({ required: false })
  examNumber: number;
  @Prop({ required: true })
  examType: string;
  @Prop({ required: true })
  examId: string;
  @Prop({ required: false })
  totalQuestions: number;
  @Prop({ required: false })
  correctCount: number;
  @Prop({ required: false })
  incorrectCount: number;
  @Prop({ required: false })
  unansweredCount: number;
}

export const ReportSubjectiveSchema =
  SchemaFactory.createForClass(ReportSubjective);
