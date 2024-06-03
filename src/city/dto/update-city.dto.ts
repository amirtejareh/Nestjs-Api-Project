import { PartialType } from "@nestjs/swagger";
import { CreateCityDto } from "./create-city.dto";

export class UpdateCityDto extends PartialType(CreateCityDto) {
  readonly name: string;
  readonly slug: string;
  readonly province_id: number;
}
