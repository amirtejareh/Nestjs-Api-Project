import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { GradeLevelService } from "./grade-level.service";
import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@Controller("grade-level")
export class GradeLevelController {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Body() createGradeLevelDto: CreateGradeLevelDto) {
    return this.gradeLevelService.create(createGradeLevelDto);
  }

  @Get()
  findAll() {
    return this.gradeLevelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gradeLevelService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateGradeLevelDto: UpdateGradeLevelDto
  ) {
    return this.gradeLevelService.update(id, updateGradeLevelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gradeLevelService.remove(id);
  }
}
