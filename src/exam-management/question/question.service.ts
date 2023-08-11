import { Body, Injectable, Param, Res } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuestionRepository } from "./question.repository";

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  create(@Res() res, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.create(res, createQuestionDto);
  }

  findAll() {
    return this.questionRepository.findAll();
  }

  findOne(@Param("id") id: string) {
    return this.questionRepository.findOne(id);
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
