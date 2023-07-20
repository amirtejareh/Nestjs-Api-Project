import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { RoleModule } from "../role/role.module";
import { RoleService } from "../role/role.service";
import { RoleRepository } from "../role/role.repository";
import { RoleSchema } from "../role/entities/role.entity";

@Module({
  imports: [
    RoleModule,
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "role", schema: RoleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [RoleService, RoleRepository, UsersService, UserRepository],
})
export class UsersModule {}
