import { Module } from "@nestjs/common";
import { ReportSubjectiveService } from "./report-subjective.service";
import { ReportSubjectiveController } from "./report-subjective.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ReportSubjective,
  ReportSubjectiveSchema,
} from "./entities/report-subjective.entity";
import { ReportSubjectiveRepository } from "./report-subjective.repository";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../../common/services/imageService";
import { Subjective } from "../subjective/entities/subjective.entity";
import { SubjectiveService } from "../subjective/subjective.service";
import { SubjectiveRepository } from "../subjective/subjective.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReportSubjective.name,
        schema: ReportSubjectiveSchema,
      },
      {
        name: Subjective.name,
        schema: ReportSubjectiveSchema,
      },
    ]),
  ],
  controllers: [ReportSubjectiveController],
  providers: [
    ReportSubjectiveService,
    ReportSubjectiveRepository,
    SubjectiveService,
    SubjectiveRepository,
    JwtService,
    ImageService,
  ],
})
export class ReportSubjectiveModule {}
