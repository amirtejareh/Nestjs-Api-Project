import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { User } from "../../users/entities/user.entity";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Payment {
  @Prop({
    required: false,
  })
  amount: string;
  @Prop({
    required: false,
  })
  email: string;

  @Prop({
    required: false,
  })
  authority: string;

  @Prop({
    required: false,
  })
  verify: boolean;

  @Prop({
    required: false,
  })
  refId: string;

  @Prop({
    required: false,
  })
  userId: string;

  @Prop({
    required: false,
  })
  cardHash: string;

  @Prop({
    required: false,
  })
  paymentDate: number;

  @Prop({
    required: false,
  })
  invoiceNumber: string;

  @Prop({
    required: false,
  })
  mobile: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel[];

  @Prop({ enum: ["comprehensive_test", "quiz"] })
  type: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
