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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateObjectiveTestManagementDto } from "./dto/create-objective-test-management.dto";
import { ObjectiveTestManagementService } from "./objective-test-management.service";
import { UpdateObjectiveTestManagementDto } from "./dto/update-objective-test-management.dto";
@ApiTags("Objective Test Management")
@Controller("objectiveTestManagement")
export class ObjectiveTestManagementController {
  constructor(
    private readonly objectiveTestService: ObjectiveTestManagementService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(
    @Res() res,
    @Body() createObjectiveTestManagementDto: CreateObjectiveTestManagementDto
  ) {
    return this.objectiveTestService.create(
      res,
      createObjectiveTestManagementDto
    );
  }

  @Get()
  findAll() {
    return this.objectiveTestService.findAll();
  }

  @Get("withObjectiveTests/:objectiveTestId")
  async getObjectiveTestsBasedNumber(
    @Param("objectiveTestId") objectiveTests: string
  ) {
    return this.objectiveTestService.getObjectiveTestsBasedNumber(
      objectiveTests
    );
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.objectiveTestService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateObjectiveTestManagementDto: UpdateObjectiveTestManagementDto
  ) {
    return this.objectiveTestService.update(
      res,
      id,
      updateObjectiveTestManagementDto
    );
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.objectiveTestService.remove(res, id);
  }
}
