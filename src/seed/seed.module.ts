import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeederService } from "./seed.service";
import {
  Permission,
  PermissionSchema,
} from "../permission/entities/permission.entity";
import { Role, RoleSchema } from "../role/entities/role.entity";
import {
  TermOfStudy,
  TermOfStudySchema,
} from "../content-management/term-of-study/entities/term-of-study.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: TermOfStudy.name, schema: TermOfStudySchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedModule {}
