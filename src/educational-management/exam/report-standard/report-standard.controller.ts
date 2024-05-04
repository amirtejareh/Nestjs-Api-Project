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
import { ReportStandardService } from "./report-standard.service";
import { CreateReportStandardDto } from "./dto/create-report-standard.dto";
import { UpdateReportStandardDto } from "./dto/update-report-standard.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Report Standard Exam")
@Controller("report-standard")
export class ReportStandardController {
  constructor(private readonly reportStandardService: ReportStandardService) {}

  @Post()
  create(@Res() res, @Body() createReportStandardDto: CreateReportStandardDto) {
    return this.reportStandardService.create(res, createReportStandardDto);
  }

  @Get()
  findAll() {
    return this.reportStandardService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reportStandardService.findOne(+id);
  }

  @Get("withExams/:ExamId")
  async findStandardReportBasedOnExamId(
    @Res() res,
    @Query("ExamId") examId: string,
    @Query("username") username: string
  ) {
    if (examId == "") {
      return [];
    }

    return this.reportStandardService.findStandardReportBasedOnExamId(
      res,
      examId,
      username
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateReportStandardDto: UpdateReportStandardDto
  ) {
    return this.reportStandardService.update(+id, updateReportStandardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportStandardService.remove(+id);
  }
}
