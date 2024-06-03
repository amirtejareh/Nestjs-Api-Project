import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsMobilePhone,
  MaxLength,
  Length,
} from "class-validator";

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

  readonly roles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
