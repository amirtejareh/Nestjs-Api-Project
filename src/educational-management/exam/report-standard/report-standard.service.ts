import { Injectable, Res } from "@nestjs/common";
import { CreateReportStandardDto } from "./dto/create-report-standard.dto";
import { UpdateReportStandardDto } from "./dto/update-report-standard.dto";
import { ReportStandardRepository } from "./report-standard.repository";

@Injectable()
export class ReportStandardService {
  constructor(
    private readonly reportStandardRepository: ReportStandardRepository
  ) {}

  create(@Res() res, createReportStandardDto: CreateReportStandardDto) {
    return this.reportStandardRepository.create(res, createReportStandardDto);
  }

  findAll() {
    return this.reportStandardRepository.findAll();
  }
  async findStandardReportBasedOnExamId(res, examId: string, username: string) {
    if (examId == "") {
      return [];
    }

    return this.reportStandardRepository.findStandardReportBasedOnExamId(
      res,
      examId,
      username
    );
  }

  findOne(id: number) {
    return this.reportStandardRepository.findOne(id);
  }

  update(id: number, updateReportStandardDto: UpdateReportStandardDto) {
    return this.reportStandardRepository.update(id, updateReportStandardDto);
  }

  remove(id: number) {
    return this.reportStandardRepository.remove(id);
  }
}
