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
import { LearningMaterialService } from "./learning-material.service";
import { CreateLearningMaterialDto } from "./dto/create-learning-material.dto";
import { UpdateLearningMaterialDto } from "./dto/update-learning-material.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

@ApiTags("Learning Material")
@Controller("learning-material")
export class LearningMaterialController {
  constructor(
    private readonly learningMaterialService: LearningMaterialService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createLearningMaterialDto: CreateLearningMaterialDto
  ) {
    return this.learningMaterialService.create(
      res,
      pdfFiles,
      createLearningMaterialDto
    );
  }

  @Get()
  findAll() {
    return this.learningMaterialService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.learningMaterialService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findLearningMaterialBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.learningMaterialService.findBasedOnSubjects(subjects);
  }

  @Get("withBooks/:booksId")
  async findLearningMaterialBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.learningMaterialService.findBasedOnBooks(books);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateLearningMaterialDto: UpdateLearningMaterialDto
  ) {
    return this.learningMaterialService.update(
      res,
      pdfFiles,
      id,
      updateLearningMaterialDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.learningMaterialService.remove(res, id);
  }
}
