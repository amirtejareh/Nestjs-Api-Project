import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../../content-management/book/entities/book.entity";
import { ObjectiveTest } from "../../../exam-management/objective-test/entities/objective-test.entity";

export type ObjectiveTestManagementDocument = ObjectiveTestManagement &
  Document;

@Schema({ timestamps: true })
export class ObjectiveTestManagement {
  @Prop({ required: true })
  book: string;

  @Prop({ required: true })
  objectiveTest: string;

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;
}

export const ObjectiveTestManagementSchema = SchemaFactory.createForClass(
  ObjectiveTestManagement
);
