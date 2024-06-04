import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsMobilePhone,
  MaxLength,
  Length,
} from "class-validator";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";
import { FieldOfStudy } from "../../content-management/field-of-study/entities/field-of-study.entity";
import { Province } from "../../province/entities/province.entity";
import { City } from "../../city/entities/city.entity";

export class CreateUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "amir",
  })
  @IsNotEmpty({ message: "فیلد نام کاربری اجباری است" })
  @Length(3, 255, { message: "عنوان کتاب باید بین ۳ تا ۲۵۵ حرف باشد" })
  readonly username: string;

  @ApiProperty({
    description: "Email of the user",
    example: "amir@gmail.com",
  })
  @IsNotEmpty({ message: "فیلد ایمیل اجباری است" })
  @IsEmail(undefined, { message: "فرمت ایمیل صحیح نیست" })
  readonly email: string;

  @ApiProperty({
    description: "Password of the user",
    example: "123",
  })
  @IsNotEmpty({ message: "فیلد رمز عبور اجباری است" })
  @MaxLength(16, { message: "حداکثر طول رمز عبور ۱۶ کاراکتر است" })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        "رمز عبور شامل حداقل ۸ کاراکتر یک حرف کوچک، یک حرف بزرگ و یک عدداست",
    }
  )
  readonly password: string;

  @ApiProperty({
    description: "Mobile of the user",
    example: "09122222222",
  })
  @IsMobilePhone("fa-IR", undefined, {
    message: "شماره تلفن همراه وارد شده معتبر نیست.",
  })
  readonly mobile: string;

  @ApiProperty({
    description: "National Id Number of the user",
    example: "0013611232",
  })
  @IsNotEmpty({ message: "فیلد کدملی اجباری است" })
  readonly national_id_number: string;

  @ApiProperty({
    description: "Gender of the individual",
    enum: ["male", "female"],
  })
  gender?: string;

  @ApiProperty({ required: false })
  familyName?: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  birthday?: string;

  @ApiProperty({ required: false })
  fathersName?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  parentsPhone?: string;

  @ApiProperty({ type: "string", format: "binary" })
  public profilePhoto?: any;

  readonly gradeLevel?: GradeLevel[];
  readonly fieldOfStudy?: FieldOfStudy[];
  readonly province?: Province[];
  readonly city?: City[];

  readonly roles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
