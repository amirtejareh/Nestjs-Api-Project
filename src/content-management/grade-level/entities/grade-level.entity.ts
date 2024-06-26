import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { FieldOfStudy } from "../../field-of-study/entities/field-of-study.entity";

export type GradeLevelDocument = GradeLevel & Document;

@Schema({ timestamps: true })
export class GradeLevel {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: FieldOfStudy.name }],
  })
  fieldOfStudies: FieldOfStudy[];
}

export const GradeLevelSchema = SchemaFactory.createForClass(GradeLevel);
GradeLevelSchema.virtual("onlinegradereports", {
  ref: "OnlineGradeReport",
  localField: "_id",
  foreignField: "gradeLevel",
});

GradeLevelSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "gradeLevels",
});

GradeLevelSchema.virtual("objectivetests", {
  ref: "ObjectiveTest",
  localField: "_id",
  foreignField: "gradeLevel",
});

GradeLevelSchema.virtual("createexams", {
  ref: "CreateExam",
  localField: "_id",
  foreignField: "gradeLevel",
});

GradeLevelSchema.virtual("essayquestions", {
  ref: "EssayQuestion",
  localField: "_id",
  foreignField: "gradeLevel",
});
GradeLevelSchema.virtual("subjects", {
  ref: "Subject",
  localField: "_id",
  foreignField: "gradeLevels",
});

GradeLevelSchema.virtual("contenteducationalpricings", {
  ref: "ContentEducationalPricing",
  localField: "_id",
  foreignField: "gradeLevel",
});

GradeLevelSchema.virtual("bookreferences", {
  ref: "BookReference",
  localField: "_id",
  foreignField: "gradeLevels",
});

GradeLevelSchema.virtual("comprehensivetests", {
  ref: "ComprehensiveTest",
  localField: "_id",
  foreignField: "gradeLevel",
});
