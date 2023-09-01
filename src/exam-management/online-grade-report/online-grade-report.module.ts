import { Module } from "@nestjs/common";
import { OnlineGradeReportService } from "./online-grade-report.service";
import { OnlineGradeReportController } from "./online-grade-report.controller";
import { OnlineGradeReportRepository } from "./online-grade-report.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  OnlineGradeReport,
  OnlineGradeReportSchema,
} from "./entities/online-grade-report.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineGradeReport.name, schema: OnlineGradeReportSchema },
    ]),
  ],
  controllers: [OnlineGradeReportController],
  providers: [
    OnlineGradeReportService,
    OnlineGradeReportRepository,
    JwtService,
  ],
})
export class OnlineGradeReportModule {}
