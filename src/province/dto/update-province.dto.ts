import { PartialType } from "@nestjs/swagger";
import { CreateProvinceDto } from "./create-province.dto";

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  readonly name: string;
  readonly slug: string;
  readonly id: number;
}
