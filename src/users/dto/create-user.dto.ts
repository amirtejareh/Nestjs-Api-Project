import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "amir",
  })
  readonly username: string;

  @ApiProperty({
    description: "Email of the user",
    example: "amir@gmail.com",
  })
  readonly email: string;

  @ApiProperty({
    description: "Password of the user",
    example: "123",
  })
  readonly password: string;

  @ApiProperty({
    description: "Mobile of the user",
    example: "09122222222",
  })
  readonly mobile: string;

  @ApiProperty({
    description: "National Id Number of the user",
    example: "0013611232",
  })
  readonly national_id_number: number;
  readonly roles?: string[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
