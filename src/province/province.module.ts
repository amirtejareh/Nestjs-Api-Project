import { Module } from "@nestjs/common";
import { ProvinceService } from "./province.service";
import { ProvinceController } from "./province.controller";
import { ProvinceRepository } from "./province.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Province, ProvinceSchema } from "./entities/province.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
    ]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
})
export class ProvinceModule {}
