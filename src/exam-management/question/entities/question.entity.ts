import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Chapter.name }],
  })
  chapters: Chapter[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Section.name }],
  })
  sections: Section[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Subject.name }],
  })
  subjects: Subject[];

  @Prop({ required: true, enum: ["easy", "average", "hard"] })
  questionDifficulty: string;
  @Prop({
    required: true,
    enum: [
      "conceptional",
      "computational",
      "trick",
      "memorizational",
      "challenging",
    ],
  })
  questionType: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  number: number;

  @Prop({ required: false })
  objectiveTests: ObjectiveTest[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
