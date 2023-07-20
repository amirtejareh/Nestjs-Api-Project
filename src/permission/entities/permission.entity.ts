import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Role } from "../../role/entities/role.entity";

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Permission {
  @Prop({ required: true })
  title: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.virtual("roles", {
  ref: "Role",
  localField: "_id",
  foreignField: "permissions",
});
