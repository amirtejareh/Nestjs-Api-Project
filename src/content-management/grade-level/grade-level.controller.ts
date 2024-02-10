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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { GradeLevelService } from "./grade-level.service";
import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
@ApiTags("Grade Level")
@Controller("grade-level")
export class GradeLevelController {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Body() createGradeLevelDto: CreateGradeLevelDto
  ) {
    const result = this.gradeLevelService.create(
      res,
      file,
      createGradeLevelDto
    );

    return result;
  }

  @Get()
  async findAll() {
    return this.gradeLevelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gradeLevelService.findOne(id);
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

    @Body() updateGradeLevelDto: UpdateGradeLevelDto
  ) {
    return this.gradeLevelService.update(res, file, id, updateGradeLevelDto);
  }
  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.gradeLevelService.remove(res, id);
  }
}
