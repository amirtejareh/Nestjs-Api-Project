import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  readonly name: string;
  readonly slug: string;
  readonly id: number;
}
