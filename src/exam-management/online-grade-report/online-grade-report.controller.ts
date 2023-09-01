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
import { OnlineGradeReportService } from "./online-grade-report.service";
import { CreateOnlineGradeReportDto } from "./dto/create-online-grade-report.dto";
import { UpdateOnlineGradeReportDto } from "./dto/update-online-grade-report.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@ApiTags("Online grade report")
@Controller("online-grade-report")
export class OnlineGradeReportController {
  constructor(
    private readonly onlineGradeReportService: OnlineGradeReportService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(
    @Res() res,
    @Body() createOnlineGradeReportDto: CreateOnlineGradeReportDto
  ) {
    return this.onlineGradeReportService.create(
      res,
      createOnlineGradeReportDto
    );
  }

  @Get()
  findAll() {
    return this.onlineGradeReportService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.onlineGradeReportService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateOnlineGradeReportDto: UpdateOnlineGradeReportDto
  ) {
    return this.onlineGradeReportService.update(
      res,
      id,
      updateOnlineGradeReportDto
    );
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.onlineGradeReportService.remove(res, id);
  }
}
