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
import { TipAndTestService } from "./tip-and-test.service";
// import { CreateTipAndTestDto } from './dto/create-learning-material.dto';
// import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';
import { CreateTipAndTestDto } from "./dto/create-tip-and-test.dto";
import { UpdateTipAndTestDto } from "./dto/update-tip-and-test.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

@ApiTags("Tip And Test")
@Controller("tip-and-test")
export class TipAndTestController {
  constructor(private readonly tipAndTestService: TipAndTestService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createTipAndTestDto: CreateTipAndTestDto
  ) {
    return this.tipAndTestService.create(res, pdfFiles, createTipAndTestDto);
  }

  @Get()
  findAll() {
    return this.tipAndTestService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tipAndTestService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findTipAndTestBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }

    return this.tipAndTestService.findBasedOnSubjects(subjects);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateTipAndTestDto: UpdateTipAndTestDto
  ) {
    return this.tipAndTestService.update(
      res,
      pdfFiles,
      id,
      updateTipAndTestDto
    );
  }

  @Get("withBooks/:booksId")
  async findTipAndTestBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.tipAndTestService.findBasedOnBooks(books);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.tipAndTestService.remove(res, id);
  }
}
