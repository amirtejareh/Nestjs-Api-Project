import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "./payment.controller";
import { Module } from "@nestjs/common";
import { Payment, PaymentSchema } from "./entities/payment.entity";
import { PaymentRepository } from "./payment.repository";
import { PaymentService } from "./payment.service";
import {
  Permission,
  PermissionSchema,
} from "../permission/entities/permission.entity";
import { Role, RoleSchema } from "../role/entities/role.entity";
import { User, UserSchema } from "../users/entities/user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
