import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../grade-level/entities/grade-level.entity";

export type FieldOfStudyDocument = FieldOfStudy & Document;

@Schema({ timestamps: true })
export class FieldOfStudy {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
}

export const FieldOfStudySchema = SchemaFactory.createForClass(FieldOfStudy);
