import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as mongooseSchema } from "mongoose";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";
import { City } from "../../city/entities/city.entity";
import { FieldOfStudy } from "../../content-management/field-of-study/entities/field-of-study.entity";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

enum GenderValue {
  Male = "male",
  Female = "female",
}

enum GenderLabel {
  Male = "مرد",
  Female = "زن",
}
@Schema()
export class User {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Role.name }],
  })
  roles: Permission[];

  @Prop()
  username: string;

  @Prop()
  mobile: string;

  @Prop({ required: false, type: Object })
  gender: { value: GenderValue; label: GenderLabel };

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

  @Prop({ required: false, type: Object })
  province: { value: number; label: string };

  @Prop({ required: false, type: Object })
  city: { value: number; label: string };

  @Prop({ required: false, type: Object })
  fieldOfStudy: { value: number; label: string };

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel[];

  @Prop({ required: false })
  gradeLevelMaxUpdated: number;

  @Prop({ required: false })
  public profilePhoto?: string;

  @Prop({ required: false })
  public slogan?: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  national_id_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
