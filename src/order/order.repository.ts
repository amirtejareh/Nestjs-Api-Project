import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import ZarinpalCheckout from "../../lib/zarinpal";
import { Response } from "express";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly OrderModel: Model<Order>
  ) {}

  async findOneByTitle(title: string) {
    return this.OrderModel.findOne({ title }).exec();
  }

  async create(@Res() res: Response, createOrderDto: CreateOrderDto) {
    try {
      var zarinpal = ZarinpalCheckout.create(
        "2cd95860-22ad-42c3-9656-1143ba4b7de3",
        false
      );
      const response = await zarinpal.PaymentRequest({
        Amount: createOrderDto.amount,
        CallbackURL: "https://karanbala.ir/order/callbackUrl",
        Description: "description",
        Email: createOrderDto.email,
        Mobile: createOrderDto.mobile,
      });

      if (response.authority) {
        this.OrderModel.create({
          amount: createOrderDto.amount,

          email: createOrderDto.email,

          resnumber: response.authority,

          userId: new Types.ObjectId(createOrderDto.userId),

          mobile: createOrderDto.mobile,
        });
        return res.status(200).json({
          statusCode: 200,
          data: `https://www.zarinpal.com/pg/StartPay/${response.authority}`,
        });
      }
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.OrderModel.find({});
  }

  findOne(id: string) {
    return this.OrderModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateOrderDto: UpdateOrderDto
  ) {
    try {
      const Order = await this.OrderModel.findById(id);

      if (!Order) {
        throw new NotFoundException("شهر مورد نظر یافت نشد.");
      }

      const updateOrderlModel = await this.OrderModel.findByIdAndUpdate(
        id,
        updateOrderDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "شهر با موفقیت بروزرسانی شد.",
        data: updateOrderlModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async remove(@Res() res, id: string) {
    try {
      const findOneOrder = await this.findOne(id);

      if (findOneOrder) {
        const deleteOrder = await this.OrderModel.deleteOne({
          _id: id,
        });
        if (!deleteOrder) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "شهر مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "شهر مورد نظر با موفقیت حذف شد",
          data: deleteOrder,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "شهر مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف شهر مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
