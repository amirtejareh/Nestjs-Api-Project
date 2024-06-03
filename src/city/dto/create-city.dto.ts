import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {
  @ApiProperty({
    description: "Name of the city",
    example: "Tehran",
  })
  readonly name: string;
  @ApiProperty({
    description: "Slug of the city",
    example: "Rezvan-shahr",
  })
  readonly slug: string;
  @ApiProperty({
    description: "Province id of the city",
    example: "11111",
  })
  readonly province_id: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
