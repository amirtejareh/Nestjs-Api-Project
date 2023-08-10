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
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/create-section.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { UpdateSectionDto } from "./dto/update-section.dto";

@ApiTags("Section")
@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(res, createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sectionService.findOne(id);
  }

  @Get("withChapters/:chapterId")
  async findSectionsBasedOnChapters(
    @Param("chapterId", ParseArrayPipe) chapters: string[]
  ) {
    if (chapters[0] == "null") {
      return [];
    }

    return this.sectionService.findSectionsBasedOnChapters(chapters);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ) {
    return this.sectionService.update(res, id, updateSectionDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.sectionService.remove(res, id);
  }
}
