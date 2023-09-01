import { Injectable, Res } from "@nestjs/common";
import { CreateOnlineGradeReportDto } from "./dto/create-online-grade-report.dto";
import { UpdateOnlineGradeReportDto } from "./dto/update-online-grade-report.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OnlineGradeReport } from "./entities/online-grade-report.entity";

@Injectable()
export class OnlineGradeReportRepository {
  constructor(
    @InjectModel(OnlineGradeReport.name)
    private readonly onlineGradeRepositoryModel: Model<OnlineGradeReport>
  ) {}

  create(@Res() res, createOnlineGradeReportDto: CreateOnlineGradeReportDto) {
    return "This action adds a new onlineGradeReport";
  }

  findAll() {
    return `This action returns all onlineGradeReport`;
  }

  findOne(id: string) {
    return `This action returns a #${id} onlineGradeReport`;
  }

  update(
    @Res() res,
    id: string,
    updateOnlineGradeReportDto: UpdateOnlineGradeReportDto
  ) {
    return `This action updates a #${id} onlineGradeReport`;
  }

  remove(@Res() res, id: string) {
    return `This action removes a #${id} onlineGradeReport`;
  }
}
