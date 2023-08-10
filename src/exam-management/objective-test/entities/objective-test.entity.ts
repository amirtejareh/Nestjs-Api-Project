import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";

export type ObjectiveTestDocument = ObjectiveTest & Document;

@Schema({ timestamps: true })
export class ObjectiveTest {
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
  question: string[];

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  examNumber: number;

  @Prop({
    required: true,
    enum: ["main", "remedial"],
  })
  examType: string;
}

export const ObjectiveTestSchema = SchemaFactory.createForClass(ObjectiveTest);
