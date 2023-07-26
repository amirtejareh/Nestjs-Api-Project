import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Permission {
  @Prop({ required: true })
  resource: string;
  @Prop({ required: true })
  action: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.virtual("roles", {
  ref: "Role",
  localField: "_id",
  foreignField: "permissions",
});
