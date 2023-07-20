import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Role.name }],
  })
  roles: Permission[];

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
