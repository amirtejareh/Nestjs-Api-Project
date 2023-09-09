import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";
import { BookReference } from "../../../content-management/book-reference/entities/book-reference.entity";
import { ObjectiveTestManagement } from "../../objective-test-management/entities/objective-test-management.entity";

export type AnswersheetManagementDocument = AnswersheetManagement & Document;

@Schema({ timestamps: true })
export class AnswersheetManagement {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: ObjectiveTest.name }],
  })
  objectiveTest: ObjectiveTest;

  @Prop({
    type: [
      {
        type: mongooseSchema.Types.ObjectId,
        ref: ObjectiveTestManagement.name,
      },
    ],
  })
  objectiveTestManagement: ObjectiveTestManagement;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: BookReference.name }],
  })
  bookReference: BookReference;

  @Prop({
    required: true,
  })
  ExamSourcePdfFile: string[];

  @Prop({
    required: true,
  })
  AnswerSheetSourcePdfFile: string[];
}

export const AnswersheetManagementSchema = SchemaFactory.createForClass(
  AnswersheetManagement
);
