import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import ZarinpalCheckout from "../../lib/zarinpal";
import { Payment } from "./entities/payment.entity";
import moment from "moment-jalali";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Permission } from "../permission/entities/permission.entity";
import { Role } from "../role/entities/role.entity";
import { User } from "../users/entities/user.entity";
import { Book } from "../content-management/book/entities/book.entity";
@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(Payment.name)
    private readonly PaymentModel: Model<Payment>,

    @InjectModel(Permission.name)
    private readonly PermissionModel: Model<Permission>,

    @InjectModel(User.name)
    private readonly UserModel: Model<User>,

    @InjectModel(Role.name)
    private readonly RoleModel: Model<Role>
  ) {}

  async findOneByTitle(title: string) {
    return this.PaymentModel.findOne({ title }).exec();
  }

  async invoiceGenerator() {
    return (
      moment().format("jYYYYjMMjDDHHmmssSSS") +
      String(process.hrtime()[1]).padStart(9, "0")
    );
  }

  async updateUserRoles(book: Book, type: string, id: string) {
    let permissions;
    if (type === "comprehensive_test") {
      permissions = [{ resource: "ComprehensiveTest" + book, action: "read" }];
    }

    if (type === "quiz") {
      permissions = [{ resource: "Quiz" + book, action: "read" }];
    }

    let roles;

    if (type === "comprehensive_test") {
      roles = [
        {
          title: "ComprehensiveTest" + book,
          permissions,
        },
      ];
    }

    if (type === "quiz") {
      roles = [
        {
          title: "Quiz" + book,
          permissions,
        },
      ];
    }

    for (const permission of permissions) {
      const existingPermission = await this.PermissionModel.findOne({
        resource: permission.resource,
        action: permission.action,
      });

      if (!existingPermission) {
        await this.PermissionModel.create(permission);
      }
    }

    for (const role of roles) {
      const permissionObjects = await this.PermissionModel.find({
        resource: { $in: role.permissions.map((p) => p.resource) },
        action: { $in: role.permissions.map((p) => p.action) },
      }).exec();
      const permissionIds = permissionObjects.map(
        (permission) => permission._id
      );

      const existingRole: any = await this.RoleModel.findOne({
        title: role.title,
      });

      if (!existingRole) {
        await this.RoleModel.create({
          title: role.title,
          permissions: permissionIds,
        });
      }
    }
    const existingRole: any = await this.RoleModel.findOne({
      title: roles[0].title,
    });
    await this.UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { roles: existingRole } },
      { new: true }
    );
  }

  async create(@Res() res, createPaymentDto: CreatePaymentDto) {
    try {
      const isProductPaid = await this.PaymentModel.findOne({
        book: {
          $in: createPaymentDto.book,
        },
        userId: createPaymentDto.userId,
        verify: true,
      });

      if (isProductPaid) {
        return res.status(400).json({
          statusCode: 400,
          message: "این محصول پیش از این خریداری شده است",
        });
      }

      var zarinpal = ZarinpalCheckout.create(
        "2cd95860-22ad-42c3-9656-1143ba4b7de3",
        false
      );
      const response = await zarinpal.PaymentRequest({
        Amount: createPaymentDto.amount,
        CallbackURL: `${process.env.BASE_URL}/dashboard/user/purchase/callbackUrl`,
        Description:
          createPaymentDto.type == "comprehensive_test"
            ? "بابت خرید تست جامع"
            : "بابت خرید آزمون",
        Email: createPaymentDto.email,
        Mobile: createPaymentDto.mobile,
      });

      if (response.authority && response.status == 100) {
        await this.PaymentModel.create({
          invoiceNumber: await this.invoiceGenerator(),
          verify: false,
          amount: createPaymentDto.amount,
          email: createPaymentDto.email,
          userId: createPaymentDto.userId,
          authority: response.authority,
          mobile: createPaymentDto.mobile,
          book: createPaymentDto.book,
          type: createPaymentDto.type,
        });
        return res.status(200).json({
          statusCode: 200,
          data: `https://www.zarinpal.com/pg/StartPay/${response.authority}`,
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message:
          "مشکلی در اتصال با زرین پال بوجود آمده است لطفا مجدد تلاش کنید",
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }
  async getPaymentStatus(res, authority: string) {
    try {
      const payment = await this.PaymentModel.findOne({
        authority,
        verify: false,
      });

      if (!payment) {
        return res.status(404).json({
          statusCode: 404,
          message: "سفارش در انتظار پرداخت یافت نشد",
        });
      }
      if (payment.verify) {
        return res.status(400).json({
          statusCode: 400,
          message: "سفارش قبلا تکمیل شده است",
        });
      }

      var zarinpal = ZarinpalCheckout.create(
        "2cd95860-22ad-42c3-9656-1143ba4b7de3",
        false
      );
      const response = await zarinpal.PaymentVerification({
        Amount: payment.amount,
        Authority: authority,
      });

      if (response.status == 100) {
        await this.PaymentModel.findOneAndUpdate(
          { authority },
          {
            $set: {
              refId: response.RefID,
              verify: true,
            },
          },
          { new: true }
        );

        await this.updateUserRoles(
          payment.book[0],
          payment.type,
          payment.userId
        );

        return res.status(200).json({
          statusCode: 200,
          message: "پرداخت شما با موفقیت انجام شد",
        });
      }

      if (response.status == -51) {
        return res.status(500).json({
          statusCode: 500,
          message:
            "پرداخت انجام نشد در صورت کسر وجه طی ۷۲ ساعت به حساب شما باز می گردد",
        });
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message:
          "پرداخت انجام نشد در صورت کسر وجه طی ۷۲ ساعت به حساب شما باز می گردد",
      });
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const allTransactions = await this.PaymentModel.find({})
      .skip(skip)
      .limit(limit);
    const totalTransactions = await this.PaymentModel.find({}).count();

    if (allTransactions.length == 0) {
      return [];
    }
    return {
      allTransactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      totalItems: totalTransactions,
    };
  }

  findOne(id: string) {
    return this.PaymentModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updatePaymentDto: UpdatePaymentDto
  ) {
    try {
      const Payment = await this.PaymentModel.findById(id);

      if (!Payment) {
        throw new NotFoundException("شهر مورد نظر یافت نشد.");
      }

      const updatePaymentlModel = await this.PaymentModel.findByIdAndUpdate(
        id,
        updatePaymentDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "شهر با موفقیت بروزرسانی شد.",
        data: updatePaymentlModel,
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
      const findOnePayment = await this.findOne(id);

      if (findOnePayment) {
        const deletePayment = await this.PaymentModel.deleteOne({
          _id: id,
        });
        if (!deletePayment) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "شهر مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "شهر مورد نظر با موفقیت حذف شد",
          data: deletePayment,
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
