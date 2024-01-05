import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as mongooseSchema } from "mongoose";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Role.name }],
  })
  roles: Permission[];

  @Prop({ unique: true, error: "نام کاربری قبلاً ثبت شده است" })
  username: string;

  @Prop({ unique: true, error: "شماره تلفن همراه قبلاً ثبت شده است" })
  mobile: string;

  @Prop({ unique: true, error: "ایمیل قبلاً ثبت شده است" })
  email: string;

  @Prop()
  password: string;

  @Prop({ unique: true, error: "شماره ملی قبلاً ثبت شده است" })
  national_id_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
