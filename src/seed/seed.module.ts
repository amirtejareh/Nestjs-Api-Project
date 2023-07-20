import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeederService } from "./seed.service";
import {
  Permission,
  PermissionSchema,
} from "../permission/entities/permission.entity";
import { Role, RoleSchema } from "../role/entities/role.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedModule {}
