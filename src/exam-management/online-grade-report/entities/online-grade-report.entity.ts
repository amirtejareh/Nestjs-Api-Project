import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";
import { BookReference } from "../../../content-management/book-reference/entities/book-reference.entity";
import { User } from "../../../users/entities/user.entity";

export type OnlineGradeReportDocument = OnlineGradeReport & Document;

@Schema({ timestamps: true })
export class OnlineGradeReport {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: User.name }],
  })
  user: User;
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevels: GradeLevel[];
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book[];

  @Prop({ required: true })
  question: string;

  @Prop({ required: false })
  objectiveTests: ObjectiveTest[];
}

export const OnlineGradeReportSchema =
  SchemaFactory.createForClass(OnlineGradeReport);
