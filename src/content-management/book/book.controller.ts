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
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Book")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto
  ) {
    return this.bookService.create(res, file, createBookDto);
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
