import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Book } from "../../../content-management/book/entities/book.entity";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";

export type ObjectiveTestManagementDocument = ObjectiveTestManagement &
  Document;

@Schema({ timestamps: true })
export class ObjectiveTestManagement {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  books: Book;

  @Prop({
    type: { type: mongooseSchema.Types.ObjectId, ref: ObjectiveTest.name },
  })
  objectiveTest: ObjectiveTest;

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
