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
  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("objectiveTestId") objectiveTests: string
  ) {
    return this.questionService.findAll(page, limit, objectiveTests);
  }

  @Get("withBooks/:BookId")
  async findQuestionsBasedOnBooks(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") books: string
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.questionService.findQuestionsBasedOnBooks(page, limit, books);
  }

  @Get("withBookReferencess/:BookReferenceId")
  async findQuestionsBasedOnBookReferences(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") bookReferences: string
  ) {
    if (bookReferences[0] == "null") {
      return [];
    }

    return this.questionService.findQuestionsBasedOnBookReferences(
      page,
      limit,
      bookReferences
    );
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

  @Get("questionsWithObjectiveTestId/:objectiveTestId")
  async findQuestionsBasedOnObjectiveTests(
    @Param("objectiveTestId", ParseArrayPipe) objectiveTests: string
  ) {
    if (objectiveTests[0] == "null") {
      return [];
    }

    return this.questionService.findQuestionsBasedOnObjectiveTests(
      objectiveTests
    );
  }

  @Get("bookReferencesWithMainObjectiveTestId/:objectiveTestId")
  async findBookReferencesBasedOnObjectiveTests(
    @Param("objectiveTestId", ParseArrayPipe) objectiveTests: string
  ) {
    if (objectiveTests[0] == "null") {
      return [];
    }

    return this.questionService.findBookReferencesBasedOnObjectiveTests(
      objectiveTests
    );
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
