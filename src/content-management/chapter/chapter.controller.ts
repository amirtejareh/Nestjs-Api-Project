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
  ParseArrayPipe,
} from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Chapter")
@Controller("chapter")
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(res, createChapterDto);
  }

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get("withBooks/:bookId")
  async findChaptersBasedOnBooks(
    @Param("bookId", ParseArrayPipe) books: string[]
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.chapterService.findChaptersBasedOnBooks(books);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chapterService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateChapterDto: UpdateChapterDto
  ) {
    return this.chapterService.update(res, id, updateChapterDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.chapterService.remove(res, id);
  }
}
