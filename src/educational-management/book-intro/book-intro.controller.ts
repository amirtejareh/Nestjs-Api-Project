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
  UploadedFiles,
  ParseArrayPipe,
  Query,
} from "@nestjs/common";

import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BookIntroService } from "./book-intro.service";
import { CreateBookIntroDto } from "./dto/create-book-intro.dto";
import { UpdateBookIntroDto } from "./dto/update-book-intro.dto";

@ApiTags("Book Intro")
@Controller("book-intro")
export class BookIntroController {
  constructor(private readonly bookIntroService: BookIntroService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Body() createLearningMaterialDto: CreateBookIntroDto
  ) {
    return this.bookIntroService.create(
      res,
      pdfFiles,
      createLearningMaterialDto
    );
  }

  @Get()
  findAll() {
    return this.bookIntroService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookIntroService.findOne(id);
  }

  @Get("withBooks/:booksId")
  async findBookIntroBasedOnBooks(
    @Param("booksId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.bookIntroService.findBasedOnBooks(books);
  }

  @Get("withBooksAndType/:booksId")
  async findBookIntroBasedOnBooksAndType(
    @Param("booksId", ParseArrayPipe) books: string[],
    @Query("type") type: string
  ) {
    if (books[0] === "null" || type == "") {
      return [];
    }

    return this.bookIntroService.findBasedOnBooksAndType(books, type);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateBookIntroDto: UpdateBookIntroDto
  ) {
    return this.bookIntroService.update(res, pdfFiles, id, updateBookIntroDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.bookIntroService.remove(res, id);
  }
}
