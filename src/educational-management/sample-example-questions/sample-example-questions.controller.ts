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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { SampleExampleQuestionsService } from "./sample-example-questions.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateSampleExampleQuestionsDto } from "./dto/create-sample-example-question.dto";
import { UpdateSampleExampleQuestionsDto } from "./dto/update-sample-example-question.dto";

@ApiTags("Sample Example Questions")
@Controller("sample-example-questions")
export class SampleExampleQuestionsController {
  constructor(
    private readonly sampleExampleQuestionsService: SampleExampleQuestionsService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createSampleExampleQuestionDto: CreateSampleExampleQuestionsDto
  ) {
    return this.sampleExampleQuestionsService.create(
      res,
      pdfFiles,
      createSampleExampleQuestionDto
    );
  }

  @Get()
  findAll() {
    return this.sampleExampleQuestionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sampleExampleQuestionsService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findSampleExampleQuestionsBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.sampleExampleQuestionsService.findBasedOnSubjects(subjects);
  }

  @Get("withBooks/:booksId")
  async findSampleExampleQuestionsBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.sampleExampleQuestionsService.findBasedOnBooks(books);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateSampleExampleQuestionsDto: UpdateSampleExampleQuestionsDto
  ) {
    return this.sampleExampleQuestionsService.update(
      res,
      pdfFiles,
      id,
      updateSampleExampleQuestionsDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.sampleExampleQuestionsService.remove(res, id);
  }
}
