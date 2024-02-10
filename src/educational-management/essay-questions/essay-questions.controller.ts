import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Res,
  UploadedFile,
  UploadedFiles,
  ParseArrayPipe,
} from "@nestjs/common";
import { EssayQuestionService } from "./essay-questions.service";
import { CreateEssayQuestionsDto } from "./dto/create-essay-questions.dto";
import { UpdateEssayQuestionDto } from "./dto/update-essay-questions.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

@ApiTags("Essay Question")
@Controller("essay-question")
export class EssayQuestionController {
  constructor(private readonly essayQuestionService: EssayQuestionService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createEssayQuestionsDto: CreateEssayQuestionsDto
  ) {
    return this.essayQuestionService.create(
      res,
      pdfFiles,
      createEssayQuestionsDto
    );
  }

  @Get()
  findAll() {
    return this.essayQuestionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.essayQuestionService.findOne(id);
  }

  @Get("withBooks/:booksId")
  async findEssayQuestionBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.essayQuestionService.findBasedOnBooks(books);
  }

  @Get("withSubjects/:subjectsId")
  async findEssayQuestionBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.essayQuestionService.findBasedOnSubjects(subjects);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateEssayQuestionDto: UpdateEssayQuestionDto
  ) {
    return this.essayQuestionService.update(
      res,
      pdfFiles,
      id,
      updateEssayQuestionDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.essayQuestionService.remove(res, id);
  }
}
