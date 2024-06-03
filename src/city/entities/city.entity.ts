import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type CityDocument = City & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  province_id: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
