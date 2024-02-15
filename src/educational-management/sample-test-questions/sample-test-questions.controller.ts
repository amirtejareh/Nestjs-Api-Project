import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFiles,
  ParseArrayPipe,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { CreateSampleTestQuestionsDto } from "./dto/create-sample-test-question.dto";
import { UpdateSampleTestQuestionsDto } from "./dto/update-sample-test-question.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { SampleTestQuestionsService } from "./sample-test-questions.service";

@Controller("sample-test-questions")
export class SampleTestQuestionsController {
  constructor(
    private readonly sampleTestQuestionsService: SampleTestQuestionsService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @ApiConsumes("multipart/form-data")
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createSampleExampleQuestionDto: CreateSampleTestQuestionsDto
  ) {
    return this.sampleTestQuestionsService.create(
      res,
      pdfFiles,
      createSampleExampleQuestionDto
    );
  }

  @Get()
  findAll() {
    return this.sampleTestQuestionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sampleTestQuestionsService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findSampleTestQuestionsBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.sampleTestQuestionsService.findBasedOnSubjects(subjects);
  }

  @Get("withBooks/:booksId")
  async findSampleTestQuestionsBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.sampleTestQuestionsService.findBasedOnBooks(books);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes("multipart/form-data")
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateSampleTestQuestionsDto: UpdateSampleTestQuestionsDto
  ) {
    return this.sampleTestQuestionsService.update(
      res,
      pdfFiles,
      id,
      updateSampleTestQuestionsDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.sampleTestQuestionsService.remove(res, id);
  }
}
