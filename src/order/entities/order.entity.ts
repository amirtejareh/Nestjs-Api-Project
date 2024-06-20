import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { User } from "../../users/entities/user.entity";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Order {
  @Prop({
    required: false,
  })
  readonly amount: string;
  @Prop({
    required: false,
  })
  readonly email: string;

  @Prop({
    required: false,
  })
  readonly resnumber: string;

  @Prop({
    required: true,
  })
  readonly userId: string;

  @Prop({
    required: false,
  })
  readonly mobile: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
