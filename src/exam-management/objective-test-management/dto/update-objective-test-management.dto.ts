import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateObjectiveTestManagementDto } from "./create-objective-test-management.dto";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";
import { Book } from "../../../content-management/book/entities/book.entity";

export class UpdateObjectiveTestManagementDto extends PartialType(
  CreateObjectiveTestManagementDto
) {
  @ApiProperty()
  books: Book;

  @ApiProperty()
  objectiveTest: ObjectiveTest;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
