import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SigninUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "amir",
  })
  @IsNotEmpty({ message: "فیلد نام کاربری اجباری است" })
  readonly username: string;

  @ApiProperty({
    description: "Password of the user",
    example: "123",
  })
  @IsNotEmpty({ message: "فیلد رمز عبور اجباری است" })
  readonly password: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
