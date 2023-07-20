import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { PermissionModule } from "../permission/permission.module";
import { RoleModule } from "../role/role.module";
import { Role, RoleSchema } from "../role/entities/role.entity";
import {
  Permission,
  PermissionSchema,
} from "../permission/entities/permission.entity";
import { User, UserSchema } from "../users/entities/user.entity";
import { SeedModule } from "../seed/seed.module";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/karanbala"),
    UsersModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
