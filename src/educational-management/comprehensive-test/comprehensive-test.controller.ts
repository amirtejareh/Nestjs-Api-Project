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
import { CreateComprehensiveTestDto } from "./dto/create-comprehensive-test.dto";
import { UpdateComprehensiveTestDto } from "./dto/update-comprehensive-test.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { ComprehensiveTestService } from "./comprehensive-test.service";

@ApiTags("Comprehensive Test")
@Controller("comprehensive-test")
export class ComprehensiveTestController {
  constructor(
    private readonly comprehensiveTestService: ComprehensiveTestService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @ApiConsumes("multipart/form-data")
  create(
    @Res() res,
    @Body() createComprehensiveTestDto: CreateComprehensiveTestDto
  ) {
    return this.comprehensiveTestService.create(
      res,
      createComprehensiveTestDto
    );
  }

  @Get()
  findAll() {
    return this.comprehensiveTestService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.comprehensiveTestService.findOne(id);
  }

  @Get("withChapters/:chapterId")
  async findComprehensiveTestBasedOnChapters(
    @Param("chapterId", ParseArrayPipe) chapters: string[]
  ) {
    if (chapters[0] == "null") {
      return [];
    }

    return this.comprehensiveTestService.findBasedOnChapters(chapters);
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateComprehensiveTestDto: UpdateComprehensiveTestDto
  ) {
    return this.comprehensiveTestService.update(
      res,
      id,
      updateComprehensiveTestDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.comprehensiveTestService.remove(res, id);
  }
}
