import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "amir",
  })
  readonly username: string;

  @ApiProperty({
    description: "Password of the user",
    example: "123",
  })
  readonly password: string;
  readonly roles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
