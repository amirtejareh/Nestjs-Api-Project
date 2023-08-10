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
import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
@ApiTags("Subject")
@Controller("subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(res, createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectService.findOne(id);
  }

  @Get("withSections/:sectionId")
  async findSubjectsBasedOnSections(
    @Param("sectionId", ParseArrayPipe) sections: string[]
  ) {
    if (sections[0] == "null") {
      return [];
    }

    return this.subjectService.findSubjectsBasedOnSections(sections);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectDto: UpdateSubjectDto
  ) {
    return this.subjectService.update(res, id, updateSubjectDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.subjectService.remove(res, id);
  }
}
