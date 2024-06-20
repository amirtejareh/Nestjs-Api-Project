import { MongooseModule } from "@nestjs/mongoose";
import { OrderController } from "./order.controller";
import { Module } from "@nestjs/common";
import { Order, OrderSchema } from "./entities/order.entity";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
