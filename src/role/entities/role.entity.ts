import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Permission } from "../../permission/entities/permission.entity";

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Permission.name }],
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "roles",
});
