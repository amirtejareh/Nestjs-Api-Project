import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type ProvinceDocument = Province & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Province {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  id: number;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);

ProvinceSchema.virtual("cities", {
  ref: "City",
  localField: "_id",
  foreignField: "province_id",
});
