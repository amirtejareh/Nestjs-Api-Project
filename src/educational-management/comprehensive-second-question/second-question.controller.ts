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
import { CreateSecondQuestionDto } from "./dto/create-second-question.dto";
import { UpdateSecondQuestionDto } from "./dto/update-second-question-question.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { SecondQuestionService } from "./second-question.service";

@ApiTags("Second Question")
@Controller("second-question")
export class SecondQuestionController {
  constructor(private readonly firstQuestionService: SecondQuestionService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createSecondQuestionDto: CreateSecondQuestionDto) {
    return this.firstQuestionService.create(res, createSecondQuestionDto);
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
  async findSecondQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    @Query("primaryQuestionlId") primaryQuestions: string,
    @Query("comprehensiveTestId") comprehensiveTests: string
  ) {
    if (primaryQuestions == "null") {
      return [];
    }

    if (comprehensiveTests == "null") {
      return [];
    }

    return this.firstQuestionService.findSecondQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
      primaryQuestions,
      comprehensiveTests
    );
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSecondQuestionDto: UpdateSecondQuestionDto
  ) {
    return this.firstQuestionService.update(res, id, updateSecondQuestionDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.firstQuestionService.remove(res, id);
  }
}
