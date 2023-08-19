import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateObjectiveTestManagementDto } from "./create-objective-test-management.dto";

export class UpdateObjectiveTestManagementDto extends PartialType(
  CreateObjectiveTestManagementDto
) {
  @ApiProperty({ type: [String] })
  books: string[];

  @ApiProperty({ enum: ["main", "remedial"] })
  examType: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
