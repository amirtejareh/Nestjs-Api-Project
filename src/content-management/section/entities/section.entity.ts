import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { Book } from "../../book/entities/book.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
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
}
export const SectionSchema = SchemaFactory.createForClass(Section);

SectionSchema.virtual("learningmaterials", {
  ref: "LearningMaterial",
  localField: "_id",
  foreignField: "sections",
});

SectionSchema.virtual("essayquestions", {
  ref: "EssayQuestion",
  localField: "_id",
  foreignField: "sections",
});

SectionSchema.virtual("tipandtests", {
  ref: "TipAndTest",
  localField: "_id",
  foreignField: "sections",
});
