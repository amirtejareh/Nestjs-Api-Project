import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "./payment.controller";
import { Module } from "@nestjs/common";
import { Payment, PaymentSchema } from "./entities/payment.entity";
import { PaymentRepository } from "./payment.repository";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
