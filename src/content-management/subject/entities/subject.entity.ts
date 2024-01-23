import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { TermOfStudy } from "../../term-of-study/entities/term-of-study.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";
import { Section } from "../../section/entities/section.entity";

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true })
  title: string;

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
    type: [{ type: mongooseSchema.Types.ObjectId, ref: TermOfStudy.name }],
  })
  terms: TermOfStudy[];
}
export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "subjects",
});

SubjectSchema.virtual("learningmaterials", {
  ref: "LearningMaterial",
  localField: "_id",
  foreignField: "subjects",
});

SubjectSchema.virtual("essayquestions", {
  ref: "EssayQuestion",
  localField: "_id",
  foreignField: "sections",
});
