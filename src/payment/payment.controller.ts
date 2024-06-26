import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Res() res, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(res, createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get("withAuthority/:authorityId")
  async getPaymentStatus(
    @Res() res,
    @Param("authorityId") authorityId: string
  ) {
    if (authorityId == "") {
      return [];
    }

    return this.paymentService.getPaymentStatus(res, authorityId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(":id")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    return this.paymentService.update(res, id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.paymentService.remove(res, id);
  }
}
