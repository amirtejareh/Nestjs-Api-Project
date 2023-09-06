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
  Query,
} from "@nestjs/common";
import { ObjectiveTestService } from "./objective-test.service";
import { CreateObjectiveTestDto } from "./dto/create-objective-test.dto";
import { UpdateObjectiveTestDto } from "./dto/update-objective-test.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
@ApiTags("Objective Test")
@Controller("objectiveTest")
export class ObjectiveTestController {
  constructor(private readonly objectiveTestService: ObjectiveTestService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createObjectiveTestDto: CreateObjectiveTestDto) {
    return this.objectiveTestService.create(res, createObjectiveTestDto);
  }

  @Get()
  findAll() {
    return this.objectiveTestService.findAll();
  }

  @Get("withGradeLevels/:gradeLevelId")
  async findObjectiveTestsBasedOnGradeLevels(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Param("gradeLevelId", ParseArrayPipe) gradeLevels: string[]
  ) {
    if (gradeLevels[0] == "null") {
      return [];
    }

    return this.objectiveTestService.findObjectiveTestsBasedOnGradeLevels(
      page,
      limit,
      gradeLevels
    );
  }

  @Get("mainTest")
  findMainObjectiveTest() {
    return this.objectiveTestService.findMainObjectiveTest();
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
    @Body() updateObjectiveTestDto: UpdateObjectiveTestDto
  ) {
    return this.objectiveTestService.update(res, id, updateObjectiveTestDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.objectiveTestService.remove(res, id);
  }
}
