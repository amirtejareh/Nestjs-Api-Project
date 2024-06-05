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
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto
  ) {
    return this.newsService.create(res, file, createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get("withLimit")
  findSome(@Query("limit") limit: number) {
    return this.newsService.findSome(limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
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

    @Body() updateNewsDto: UpdateNewsDto
  ) {
    return this.newsService.update(res, file, id, updateNewsDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.newsService.remove(res, id);
  }
}
