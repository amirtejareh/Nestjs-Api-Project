import { ApiProperty } from "@nestjs/swagger";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";
import { Book } from "../../../content-management/book/entities/book.entity";

export class CreateObjectiveTestManagementDto {
  @ApiProperty()
  book: Book;

  @ApiProperty()
  objectiveTest: ObjectiveTest;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
