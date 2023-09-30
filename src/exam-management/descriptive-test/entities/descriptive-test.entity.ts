import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";

export type DescriptiveTestDocument = DescriptiveTest & Document;

@Schema({ timestamps: true })
export class DescriptiveTest {
  @Prop({ required: true })
  number: string;

  @Prop({
    required: true,
    enum: ["main", "remedial"],
  })
  type: string;

  @Prop({
    required: true,
    default: false,
  })
  isPublished: boolean;

  @Prop()
  duration: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({
    required: false,
  })
  start: Date;

  @Prop({
    required: false,
  })
  end: Date;
}

export const DescriptiveTestSchema = SchemaFactory.createForClass(DescriptiveTest);

DescriptiveTestSchema.virtual("descriptivetestmanagements", {
  ref: "DescriptiveTestManagement",
  localField: "_id",
  foreignField: "descriptiveTest",
});
