import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";
import { BookReference } from "../../book-reference/entities/book-reference.entity";

export type BookDocument = Book & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Book {
  [x: string]: any;
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: BookReference.name }],
  })
  bookReferences: BookReference[];

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.virtual("chapters", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "books",
});

BookSchema.virtual("onlinegradereports", {
  ref: "OnlineGradeReporty",
  localField: "_id",
  foreignField: "objectiveTests",
});

BookSchema.virtual("learningmaterials", {
  ref: "LearningMaterial",
  localField: "_id",
  foreignField: "book",
});

BookSchema.virtual("karanbalas", {
  ref: "Karanbala",
  localField: "_id",
  foreignField: "book",
});

BookSchema.virtual("standards", {
  ref: "Standard",
  localField: "_id",
  foreignField: "books",
});

BookSchema.virtual("createexams", {
  ref: "CreateExam",
  localField: "_id",
  foreignField: "books",
});

BookSchema.virtual("reportstandards", {
  ref: "ReportStandard",
  localField: "_id",
  foreignField: "book",
});

BookSchema.virtual("learningmaterials", {
  ref: "LearningMaterial",
  localField: "_id",
  foreignField: "chapter",
});

BookSchema.virtual("essayquestions", {
  ref: "EssayQuestion",
  localField: "_id",
  foreignField: "sections",
});

BookSchema.virtual("tipandtests", {
  ref: "TipAndTest",
  localField: "_id",
  foreignField: "sections",
});

BookSchema.virtual("comprehensivetests", {
  ref: "ComprehensiveTest",
  localField: "_id",
  foreignField: "book",
});
