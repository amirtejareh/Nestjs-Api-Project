import { ApiProperty } from "@nestjs/swagger";
import { GradeLevel } from "../../content-management/grade-level/entities/grade-level.entity";

export class CreatePaymentDto {
  @ApiProperty({
    description: "Amount of the Payment",
    example: "1000",
  })
  amount: string;
  @ApiProperty({
    description: "Email of the Payment",
    example: "email@gmail.com",
  })
  email: string;

  @ApiProperty({
    description: "authority of the Payment",
    example: "11111",
  })
  authority: number;

  @ApiProperty({
    description: "mobile of the user",
    example: "11111",
  })
  mobile: number;

  @ApiProperty({
    description: "id of the user",
    example: "11111",
  })
  userId: number;

  @ApiProperty({ enum: ["comprehensive_test", "quiz"] })
  type: string;

  @ApiProperty({
    description: "Grade level id",
    example: "64d5513027862ad356480ff0",
  })
  gradeLevel: GradeLevel;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
