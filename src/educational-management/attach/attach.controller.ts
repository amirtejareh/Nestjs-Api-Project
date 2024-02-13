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
  UploadedFiles,
  Res,
  ParseArrayPipe,
} from "@nestjs/common";
import { AttachService } from "./attach.service";
import { CreateAttachDto } from "./dto/create-attach.dto";
import { UpdateAttachDto } from "./dto/update-attach.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@ApiTags("Attach")
@Controller("attach")
export class AttachController {
  constructor(private readonly attachService: AttachService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createSampleExampleQuestionDto: CreateAttachDto
  ) {
    return this.attachService.create(
      res,
      pdfFiles,
      createSampleExampleQuestionDto
    );
  }

  @Get()
  findAll() {
    return this.attachService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.attachService.findOne(id);
  }

  @Get("withChapters/:chaptersId")
  async findAttachBasedOnChapter(
    @Param("chaptersId", ParseArrayPipe) chapters: string[]
  ) {
    if (chapters[0] == "null") {
      return [];
    }

    return this.attachService.findBasedOnChapters(chapters);
  }

  @Get("withBooks/:booksId")
  async findAttachBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.attachService.findBasedOnBooks(books);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateAttachDto: UpdateAttachDto
  ) {
    return this.attachService.update(res, pdfFiles, id, updateAttachDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.attachService.remove(res, id);
  }
}
