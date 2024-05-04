import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Res,
  Query,
} from "@nestjs/common";
import { ReportSubjectiveService } from "./report-subjective.service";
import { CreateReportSubjectiveDto } from "./dto/create-report-subjective.dto";
import { UpdateReportSubjectiveDto } from "./dto/update-report-subjective.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Report Subjective Exam")
@Controller("report-subjective")
export class ReportSubjectiveController {
  constructor(
    private readonly reportSubjectiveService: ReportSubjectiveService
  ) {}

  @Post()
  create(
    @Res() res,
    @Body() createReportSubjectiveDto: CreateReportSubjectiveDto
  ) {
    return this.reportSubjectiveService.create(res, createReportSubjectiveDto);
  }

  @Get()
  findAll() {
    return this.reportSubjectiveService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reportSubjectiveService.findOne(+id);
  }

  @Get("withExams/:ExamId")
  async findSubjectiveReportBasedOnExamId(
    @Res() res,
    @Query("ExamId") examId: string,
    @Query("username") username: string
  ) {
    if (examId == "") {
      return [];
    }

    return this.reportSubjectiveService.findSubjectiveReportBasedOnExamId(
      res,
      examId,
      username
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateReportSubjectiveDto: UpdateReportSubjectiveDto
  ) {
    return this.reportSubjectiveService.update(+id, updateReportSubjectiveDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportSubjectiveService.remove(+id);
  }
}
