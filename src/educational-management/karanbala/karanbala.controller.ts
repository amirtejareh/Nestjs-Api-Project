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
// import { LearningMaterialService } from './learning-material.service';
// import { CreateLearningMaterialDto } from './dto/create-learning-material.dto';
// import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { KaranbalaService } from "./karanbala.service";
import { CreateKaranbalaDto } from "./dto/create-karanbala.dto";
import { UpdateKaranbalaDto } from "./dto/update-karanbala.dto";

@ApiTags("Karanbala")
@Controller("karanbala")
export class KaranbalaController {
  constructor(private readonly karanbalaService: KaranbalaService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createKaranbalaDto: CreateKaranbalaDto
  ) {
    return this.karanbalaService.create(res, pdfFiles, createKaranbalaDto);
  }

  @Get()
  findAll() {
    return this.karanbalaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.karanbalaService.findOne(id);
  }

  @Get("withSubjects/:subjectsId")
  async findKaranbalaBasedOnSubject(
    @Param("subjectsId", ParseArrayPipe) subjects: string[]
  ) {
    if (subjects[0] == "null") {
      return [];
    }
    return this.karanbalaService.findBasedOnSubjects(subjects);
  }

  @Get("withBooks/:booksId")
  async findKaranbalaBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.karanbalaService.findBasedOnBooks(books);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateKaranbalaDto: UpdateKaranbalaDto
  ) {
    return this.karanbalaService.update(res, pdfFiles, id, updateKaranbalaDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.karanbalaService.remove(res, id);
  }
}
