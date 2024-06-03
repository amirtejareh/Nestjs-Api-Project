import { Module } from "@nestjs/common";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { CityRepository } from "./city.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "./entities/city.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [CityController],
  providers: [CityService, CityRepository],
})
export class CityModule {}
