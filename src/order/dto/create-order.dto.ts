import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({
    description: "Amount of the Order",
    example: "1000",
  })
  readonly amount: string;
  @ApiProperty({
    description: "Email of the Order",
    example: "email@gmail.com",
  })
  readonly email: string;

  @ApiProperty({
    description: "resnumber of the Order",
    example: "11111",
  })
  readonly resnumber: number;

  @ApiProperty({
    description: "mobile of the user",
    example: "11111",
  })
  readonly mobile: number;

  @ApiProperty({
    description: "userId of the user",
    example: "11111",
  })
  readonly userId: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
