import { ApiProperty } from "@nestjs/swagger";

export class CreateObjectiveTestManagementDto {
  @ApiProperty()
  book: string;

  @ApiProperty()
  objectTest: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
