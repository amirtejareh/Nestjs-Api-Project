import { Module } from "@nestjs/common";
import { ReportStandardService } from "./report-standard.service";
import { ReportStandardController } from "./report-standard.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ReportStandard,
  ReportStandardSchema,
} from "./entities/report-standard.entity";
import { ReportStandardRepository } from "./report-standard.repository";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../../common/services/imageService";
import { Standard, StandardSchema } from "../standard/entities/standard.entity";
import { StandardService } from "../standard/standard.service";
import { StandardRepository } from "../standard/standard.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReportStandard.name,
        schema: ReportStandardSchema,
      },
      {
        name: Standard.name,
        schema: ReportStandardSchema,
      },
    ]),
  ],
  controllers: [ReportStandardController],
  providers: [
    ReportStandardService,
    ReportStandardRepository,
    StandardService,
    StandardRepository,
    JwtService,
    ImageService,
  ],
})
export class ReportStandardModule {}
