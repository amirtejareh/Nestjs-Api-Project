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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookReferenceService } from "./book-reference.service";
import { CreateBookReferenceDto } from "./dto/create-book-reference.dto";
import { UpdateBookReferenceDto } from "./dto/update-book-reference.dto";

@ApiTags("BookReference")
@Controller("bookReference")
export class BookReferenceController {
  constructor(private readonly bookReferenceService: BookReferenceService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(FileInterceptor("image"))
  create(@Res() res, @Body() createBookReferenceDto: CreateBookReferenceDto) {
    return this.bookReferenceService.create(res, createBookReferenceDto);
  }

  @Get()
  findAll() {
    return this.bookReferenceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookReferenceService.findOne(id);
  }

  @Get("withGradeLevels/:gradeLevelId")
  async findBookReferencesBasedOnGradeLevels(
    @Param("gradeLevelId", ParseArrayPipe) gradeLevels: string[]
  ) {
    if (gradeLevels[0] == "null") {
      return [];
    }

    return this.bookReferenceService.findBookReferencesBasedOnGradeLevels(
      gradeLevels
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

    @Body() updateBookReferenceDto: UpdateBookReferenceDto
  ) {
    return this.bookReferenceService.update(
      res,
      file,
      id,
      updateBookReferenceDto
    );
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.bookReferenceService.remove(res, id);
  }
}
