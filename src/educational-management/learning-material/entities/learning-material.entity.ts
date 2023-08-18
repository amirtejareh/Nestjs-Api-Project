import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type LearningMaterialDocument = LearningMaterial & Document;

@Schema({ timestamps: true })
export class LearningMaterial {
    @Prop({ required: true })
    number: number;

    @Prop({
        required: true,
    })
    start: Date;

    @Prop({
        required: true,
    })
    end: Date;
}

export const LearningMaterialSchema = SchemaFactory.createForClass(LearningMaterial);
