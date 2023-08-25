import { Body, Injectable, Param, Query, Req, Res } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuestionRepository } from "./question.repository";

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  create(@Res() res, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.create(res, createQuestionDto);
  }

  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("objectiveTestId") objectiveTests: string
  ) {
    return this.questionRepository.findAll(page, limit, objectiveTests);
  }

  async findQuestionsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    return this.questionRepository.findQuestionsBasedOnBooks(
      page,
      limit,
      books
    );
  }

  findOne(@Param("id") id: string) {
    return this.questionRepository.findOne(id);
  }

  async findBooksBasedOnObjectiveTests(objectiveTestId: string) {
    return this.questionRepository.findBooksBasedOnObjectiveTests(
      objectiveTestId
    );
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionRepository.update(res, id, updateQuestionDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.questionRepository.remove(res, id);
  }
}
