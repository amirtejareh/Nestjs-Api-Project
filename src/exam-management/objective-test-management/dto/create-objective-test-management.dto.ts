import { ApiProperty } from "@nestjs/swagger";
import { ObjectiveTest } from "../../objective-test/entities/objective-test.entity";

export class CreateObjectiveTestManagementDto {
  @ApiProperty()
  book: string[];

  @ApiProperty()
  objectiveTest: ObjectiveTest;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
