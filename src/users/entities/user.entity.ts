import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as mongooseSchema } from "mongoose";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";
import { Province } from "../../province/entities/province.entity";
import { City } from "../../city/entities/city.entity";
import { FieldOfStudy } from "../../content-management/field-of-study/entities/field-of-study.entity";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";
import { ApiProperty } from "@nestjs/swagger";

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

  @Prop({ required: false, enum: ["male", "female"] })
  gender: string;

  @Prop({ required: false })
  familyName: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  birthday: string;

  @Prop({ required: false })
  fathersName: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  parentsPhone: string;

  @Prop({
    type: [
      {
        required: false,
        type: mongooseSchema.Types.ObjectId,
        ref: Province.name,
      },
    ],
  })
  province: Province[];

  @Prop({
    type: [
      { required: false, type: mongooseSchema.Types.ObjectId, ref: City.name },
    ],
  })
  city: City[];

  @Prop({
    type: [
      {
        required: false,
        type: mongooseSchema.Types.ObjectId,
        ref: FieldOfStudy.name,
      },
    ],
  })
  fieldOfStudy: FieldOfStudy[];

  @Prop({
    type: [
      {
        required: false,
        type: mongooseSchema.Types.ObjectId,
        ref: GradeLevel.name,
      },
    ],
  })
  gradeLevel: GradeLevel[];

  @ApiProperty({ required: false, type: "string", format: "binary" })
  public profilePhoto?: any;

  @Prop({ unique: true, error: "ایمیل قبلاً ثبت شده است" })
  email: string;

  @Prop()
  password: string;

  @Prop({ unique: true, error: "شماره ملی قبلاً ثبت شده است" })
  national_id_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
