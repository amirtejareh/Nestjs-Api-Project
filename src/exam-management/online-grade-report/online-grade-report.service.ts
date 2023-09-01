import { Injectable, Param, Res } from "@nestjs/common";
import { CreateOnlineGradeReportDto } from "./dto/create-online-grade-report.dto";
import { UpdateOnlineGradeReportDto } from "./dto/update-online-grade-report.dto";
import { OnlineGradeReportRepository } from "./online-grade-report.repository";

@Injectable()
export class OnlineGradeReportService {
  constructor(
    private readonly onlineGradeReportRepository: OnlineGradeReportRepository
  ) {}

  create(@Res() res, createOnlineGradeReportDto: CreateOnlineGradeReportDto) {
    return this.onlineGradeReportRepository.create(
      res,
      createOnlineGradeReportDto
    );
  }

  findAll() {
    return this.onlineGradeReportRepository.findAll();
  }

  getObjectiveTestsBasedNumber(
    @Param("objectiveTestId") objectiveTests: string
  ) {
    return this.onlineGradeReportRepository.getObjectiveTestsBasedNumber(
      objectiveTests
    );
  }

  findOne(id: string) {
    return this.onlineGradeReportRepository.findOne(id);
  }

  update(
    @Res() res,
    id: string,
    updateOnlineGradeReportDto: UpdateOnlineGradeReportDto
  ) {
    return this.onlineGradeReportRepository.update(
      res,
      id,
      updateOnlineGradeReportDto
    );
  }

  remove(@Res() res, id: string) {
    return this.onlineGradeReportRepository.remove(res, id);
  }
}
