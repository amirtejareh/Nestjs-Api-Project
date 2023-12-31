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
} from "@nestjs/common";
import { FieldOfStudyService } from "./field-of-study.service";
import { CreateFieldOfStudyDto } from "./dto/create-field-of-study.dto";
import { UpdateFieldOfStudyDto } from "./dto/update-field-of-study.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";

@ApiTags("Field of study")
@Controller("field-of-study")
export class FieldOfStudyController {
  constructor(private readonly fieldOfStudyService: FieldOfStudyService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createFieldOfStudyDto: CreateFieldOfStudyDto) {
    return this.fieldOfStudyService.create(res, createFieldOfStudyDto);
  }

  @Get()
  findAll() {
    return this.fieldOfStudyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fieldOfStudyService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateFieldOfStudyDto: UpdateFieldOfStudyDto
  ) {
    return this.fieldOfStudyService.update(res, id, updateFieldOfStudyDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.fieldOfStudyService.remove(res, id);
  }
}
