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
import { CreateFirstQuestionDto } from "./dto/create-first-question.dto";
import { UpdateFirstQuestionDto } from "./dto/update-first-question-question.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { FirstQuestionService } from "./first-question.service";

@ApiTags("First Question")
@Controller("first-question")
export class FirstQuestionController {
  constructor(private readonly firstQuestionService: FirstQuestionService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createFirstQuestionDto: CreateFirstQuestionDto) {
    return this.firstQuestionService.create(res, createFirstQuestionDto);
  }

  @Get()
  findAll() {
    return this.firstQuestionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.firstQuestionService.findOne(id);
  }

  @Get("withPrimaryQuestions/:primaryQuestionId/:primaryQuestionlId")
  async findFirstQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    @Query("primaryQuestionlId") primaryQuestions: string,
    @Query("comprehensiveTestId") comprehensiveTests: string
  ) {
    if (primaryQuestions == "null") {
      return [];
    }

    if (comprehensiveTests == "null") {
      return [];
    }

    return this.firstQuestionService.findFirstQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
      primaryQuestions,
      comprehensiveTests
    );
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateFirstQuestionDto: UpdateFirstQuestionDto
  ) {
    return this.firstQuestionService.update(res, id, updateFirstQuestionDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.firstQuestionService.remove(res, id);
  }
}
