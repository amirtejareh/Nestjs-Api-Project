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
  Req,
  Query,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Roles } from "../../common/decorators/roles.decorator";
@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(res, createQuestionDto);
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.questionService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(id);
  }

  @Get("withMainObjectiveTestId/:objectiveTestId")
  async findBooksBasedOnObjectiveTests(
    @Param("objectiveTestId", ParseArrayPipe) objectiveTests: string
  ) {
    if (objectiveTests[0] == "null") {
      return [];
    }

    return this.questionService.findBooksBasedOnObjectiveTests(objectiveTests);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(res, id, updateQuestionDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.questionService.remove(res, id);
  }
}
