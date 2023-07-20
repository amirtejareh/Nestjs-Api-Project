import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { UserSchema } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { UserRepository } from "../users/user.repository";
import { RoleService } from "../role/role.service";
import { RoleRepository } from "../role/role.repository";
import { RoleSchema } from "../role/entities/role.entity";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_TIME },
    }),
    UsersModule,
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "role", schema: RoleSchema },
    ]),
  ],
  providers: [
    AuthService,
    UsersService,
    UserRepository,
    RoleService,
    RoleRepository,
    AuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
