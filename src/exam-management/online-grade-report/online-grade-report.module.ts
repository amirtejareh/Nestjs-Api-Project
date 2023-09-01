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
import { QuestionService } from "../question/question.service";
import { Question, QuestionSchema } from "../question/entities/question.entity";
import { QuestionRepository } from "../question/question.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineGradeReport.name, schema: OnlineGradeReportSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [OnlineGradeReportController],
  providers: [
    OnlineGradeReportService,
    OnlineGradeReportRepository,
    QuestionService,
    QuestionRepository,
    JwtService,
  ],
})
export class OnlineGradeReportModule {}
