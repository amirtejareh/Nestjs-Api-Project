import { Injectable, Res } from "@nestjs/common";
import { CreateReportSubjectiveDto } from "./dto/create-report-subjective.dto";
import { UpdateReportSubjectiveDto } from "./dto/update-report-subjective.dto";
import { ReportSubjectiveRepository } from "./report-subjective.repository";

@Injectable()
export class ReportSubjectiveService {
  constructor(
    private readonly reportSubjectiveRepository: ReportSubjectiveRepository
  ) {}

  create(@Res() res, createReportSubjectiveDto: CreateReportSubjectiveDto) {
    return this.reportSubjectiveRepository.create(
      res,
      createReportSubjectiveDto
    );
  }

  findAll() {
    return this.reportSubjectiveRepository.findAll();
  }
  async findSubjectiveReportBasedOnExamId(
    res,
    examId: string,
    username: string
  ) {
    if (examId == "") {
      return [];
    }

    return this.reportSubjectiveRepository.findSubjectiveReportBasedOnExamId(
      res,
      examId,
      username
    );
  }

  findOne(id: number) {
    return this.reportSubjectiveRepository.findOne(id);
  }

  update(id: number, updateReportSubjectiveDto: UpdateReportSubjectiveDto) {
    return this.reportSubjectiveRepository.update(
      id,
      updateReportSubjectiveDto
    );
  }

  remove(id: number) {
    return this.reportSubjectiveRepository.remove(id);
  }
}
