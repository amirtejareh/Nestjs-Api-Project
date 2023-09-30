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
import { DescriptiveTestService } from "./descriptive-test.service";
import { CreateDescriptiveTestDto } from "./dto/create-descriptive-test.dto";
import { UpdateDescriptiveTestDto } from "./dto/update-descriptive-test.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
@ApiTags("Descriptive Test")
@Controller("descriptiveTest")
export class DescriptiveTestController {
  constructor(private readonly descriptiveTestService: DescriptiveTestService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createDescriptiveTestDto: CreateDescriptiveTestDto) {
    return this.descriptiveTestService.create(res, createDescriptiveTestDto);
  }

  @Get()
  findAll() {
    return this.descriptiveTestService.findAll();
  }

  @Get("withGradeLevels/:gradeLevelId")
  async findDescriptiveTestsBasedOnGradeLevels(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Param("gradeLevelId", ParseArrayPipe) gradeLevels: string[]
  ) {
    if (gradeLevels[0] == "null") {
      return [];
    }

    return this.descriptiveTestService.findDescriptiveTestsBasedOnGradeLevels(
      page,
      limit,
      gradeLevels
    );
  }

  @Get("mainTest")
  findMainDescriptiveTest() {
    return this.descriptiveTestService.findMainDescriptiveTest();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.descriptiveTestService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateDescriptiveTestDto: UpdateDescriptiveTestDto
  ) {
    return this.descriptiveTestService.update(res, id, updateDescriptiveTestDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.descriptiveTestService.remove(res, id);
  }
}
