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
import { CreatePrimaryQuestionDto } from "./dto/create-primary-question.dto";
import { UpdatePrimaryQuestionDto } from "./dto/update-primary-question.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { PrimaryQuestionService } from "./primary-question.service";

@ApiTags("Primary Question")
@Controller("primary-question")
export class PrimaryQuestionController {
  constructor(
    private readonly primaryQuestionService: PrimaryQuestionService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(
    @Res() res,
    @Body() createPrimaryQuestionDto: CreatePrimaryQuestionDto
  ) {
    return this.primaryQuestionService.create(res, createPrimaryQuestionDto);
  }

  @Get()
  findAll() {
    return this.primaryQuestionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.primaryQuestionService.findOne(id);
  }

  @Get("withComprehensiveTest/:comprehensiveTestIds")
  async findPrimaryTestsBasedOnComprehensiveTestId(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Param("comprehensiveTestIds", ParseArrayPipe)
    comprehensiveTestIds: string[]
  ) {
    if (comprehensiveTestIds[0] == "null") {
      return [];
    }

    return this.primaryQuestionService.findPrimaryTestsBasedOnComprehensiveTestId(
      page,
      limit,
      comprehensiveTestIds
    );
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updatePrimaryQuestionDto: UpdatePrimaryQuestionDto
  ) {
    return this.primaryQuestionService.update(
      res,
      id,
      updatePrimaryQuestionDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.primaryQuestionService.remove(res, id);
  }
}
