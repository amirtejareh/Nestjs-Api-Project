import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { TermOfStudyService } from "./term-of-study.service";
import { CreateTermOfStudyDto } from "./dto/create-term-of-study.dto";
import { UpdateTermOfStudyDto } from "./dto/update-term-of-study.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("term-of-study")
export class TermOfStudyController {
  constructor(private readonly termOfStudyService: TermOfStudyService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createTermOfStudyDto: CreateTermOfStudyDto) {
    console.log("ues");

    return this.termOfStudyService.create(res, createTermOfStudyDto);
  }

  @Get()
  findAll() {
    return this.termOfStudyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.termOfStudyService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateTermOfStudyDto: UpdateTermOfStudyDto
  ) {
    return this.termOfStudyService.update(res, id, updateTermOfStudyDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.termOfStudyService.remove(res, id);
  }
}
