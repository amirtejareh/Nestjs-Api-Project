import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { UserSchema } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.auth";
import { PassportModule } from "@nestjs/passport";
import { UserRepository } from "../users/user.repository";

@Module({
  imports: [
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "60s" },
    }),
    UsersModule,
    PassportModule,

    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, UserRepository, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
