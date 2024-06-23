import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";

export class CreateContentEducationalPricingDto {
  readonly _id?: string;
  @ApiProperty({
    description: "Grade level id",
    example: "64d5513027862ad356480ff0",
  })
  readonly gradeLevel: GradeLevel;

  @ApiProperty({
    description: "Book id",
    example: "64d5513027862ad356480ff0",
  })
  readonly book: Book;

  @ApiProperty({
    description: "Price",
    example: `1000`,
  })
  readonly price: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
