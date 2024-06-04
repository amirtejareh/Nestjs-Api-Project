import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { RoleService } from "../role/role.service";
import { RoleRepository } from "../role/role.repository";
import { RoleSchema } from "../role/entities/role.entity";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { ImageService } from "../common/services/imageService";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "role", schema: RoleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    RoleService,
    RoleRepository,
    ImageService,
    UsersService,
    UserRepository,
    JwtService,
    AuthService,
  ],
})
export class UsersModule {}
