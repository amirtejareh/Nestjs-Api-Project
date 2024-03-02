import { Module } from "@nestjs/common";
import { StandardService } from "./standard.service";
import { StandardController } from "./standard.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Standard, StandardSchema } from "./entities/standard.entity";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../../common/services/imageService";
import { StandardRepository } from "./standard.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Standard.name,
        schema: StandardSchema,
      },
    ]),
  ],
  controllers: [StandardController],
  providers: [StandardService, JwtService, ImageService, StandardRepository],
})
export class StandardModule {}
