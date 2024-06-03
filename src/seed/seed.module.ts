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
import { City, CitySchema } from "../city/entities/city.entity";
import { Province, ProvinceSchema } from "../province/entities/province.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: TermOfStudy.name, schema: TermOfStudySchema },
      { name: City.name, schema: CitySchema },
      { name: Province.name, schema: ProvinceSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedModule {}
