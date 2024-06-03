import { ApiProperty } from "@nestjs/swagger";

export class CreateProvinceDto {
  @ApiProperty({
    description: "Name of the Province",
    example: "Tehran",
  })
  readonly name: string;
  @ApiProperty({
    description: "Slug of the Province",
    example: "Rezvan-shahr",
  })
  readonly slug: string;
  @ApiProperty({
    description: "id of the Province",
    example: "11111",
  })
  readonly id: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
