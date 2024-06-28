import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../content-management/book/entities/book.entity";

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
    example: "24242ewSDAD23",
  })
  userId: string;

  @ApiProperty({ enum: ["comprehensive_test", "quiz"] })
  type: string;

  @ApiProperty({
    description: "Book id",
    example: "64d5513027862ad356480ff0",
  })
  book: Book;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
