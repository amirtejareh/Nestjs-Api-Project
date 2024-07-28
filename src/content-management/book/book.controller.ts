import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  UploadedFile,
  UseInterceptors,
  ParseArrayPipe,
  UploadedFiles,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

@ApiTags("Book")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @ApiBody({ type: CreateBookDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "image", maxCount: 1 },
      { name: "galleries", maxCount: 10 },
    ])
  )
  create(
    @Res() res,
    @UploadedFiles()
    files: { image: Express.Multer.File; galleries: Express.Multer.File[] },
    @Body() createBookDto: CreateBookDto
  ) {
    const { image, galleries } = files;

    return this.bookService.create(res, image, galleries, createBookDto);

    // اینجا می‌توانید کد ذخیره سازی و پردازش تصاویر را قرار دهید
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(id);
  }

  @Get("withGradeLevels/:gradeLevelId")
  async findBooksBasedOnGradeLevels(
    @Param("gradeLevelId", ParseArrayPipe) gradeLevels: string[]
  ) {
    if (gradeLevels[0] == "null") {
      return [];
    }

    return this.bookService.findBooksBasedOnGradeLevels(gradeLevels);
  }

  @Get("withBookReferences/:bookReferenceId/:gradeLevelId")
  async findBooksBasedOnBookReferences(
    @Param("bookReferenceId", ParseArrayPipe) bookReferences: string[],
    @Param("gradeLevelId", ParseArrayPipe) gradeLevels: string[]
  ) {
    if (bookReferences[0] == "null") {
      return [];
    }

    if (gradeLevels[0] == "null") {
      return [];
    }

    return this.bookService.findBooksBasedOnBookReferences(
      gradeLevels,
      bookReferences
    );
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string,

    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.bookService.update(res, file, id, updateBookDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.bookService.remove(res, id);
  }
}
