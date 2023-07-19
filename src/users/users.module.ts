import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],

  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
