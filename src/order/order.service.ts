import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Response } from "express";

@Injectable()
export class OrderService {
  constructor(private paymentRepository: OrderRepository) {}

  create(@Res() res: Response, createOrderDto: CreateOrderDto) {
    return this.paymentRepository.create(res, createOrderDto);
  }

  findAll() {
    return this.paymentRepository.findAll();
  }

  findOne(id: string) {
    return this.paymentRepository.findOne(id);
  }

  update(@Res() res, id: string, updateOrderDto: UpdateOrderDto) {
    return this.paymentRepository.update(res, id, updateOrderDto);
  }

  remove(@Res() res, id: string) {
    return this.paymentRepository.remove(res, id);
  }
}
