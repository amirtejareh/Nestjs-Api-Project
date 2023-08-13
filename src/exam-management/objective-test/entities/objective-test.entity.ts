import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type ObjectiveTestDocument = ObjectiveTest & Document;

@Schema({ timestamps: true })
export class ObjectiveTest {
  @Prop({ required: true })
  number: string;

  @Prop({
    required: true,
    enum: ["main", "remedial"],
  })
  type: string;

  @Prop()
  duration: string;

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;
}

export const ObjectiveTestSchema = SchemaFactory.createForClass(ObjectiveTest);
