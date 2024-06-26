import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Response } from "express";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  create(@Res() res: Response, createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.create(res, createPaymentDto);
  }

  findAll() {
    return this.paymentRepository.findAll();
  }

  findOne(id: string) {
    return this.paymentRepository.findOne(id);
  }

  async getPaymentStatus(res, authorityId: string) {
    return this.paymentRepository.getPaymentStatus(res, authorityId);
  }

  update(@Res() res, id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(res, id, updatePaymentDto);
  }

  remove(@Res() res, id: string) {
    return this.paymentRepository.remove(res, id);
  }
}
