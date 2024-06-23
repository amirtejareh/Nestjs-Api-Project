import { ApiProperty, PartialType } from "@nestjs/swagger";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { IVideo } from "../../../interface/IEntity";
import { CreateContentEducationalPricingDto } from "./create-content_educational_pricing.dto";

export class UpdateContentEducationalPricingDto extends PartialType(
  CreateContentEducationalPricingDto
) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book: Book;
  readonly price: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
