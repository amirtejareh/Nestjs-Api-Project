import { Injectable, Res } from "@nestjs/common";
import { CreateFirstQuestionDto } from "./dto/create-first-question.dto";
import { UpdateFirstQuestionDto } from "./dto/update-first-question-question.dto";
import { FirstQuestionRepository } from "./first-question.repository";

@Injectable()
export class FirstQuestionService {
  constructor(
    private readonly firstQuestionRepository: FirstQuestionRepository
  ) {}

  create(@Res() res, createFirstQuestionDto: CreateFirstQuestionDto) {
    return this.firstQuestionRepository.create(res, createFirstQuestionDto);
  }

  findAll() {
    return this.firstQuestionRepository.findAll();
  }

  findOne(id: string) {
    return this.firstQuestionRepository.findOne(id);
  }

  async findFirstQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    primaryQuestions: string,
    comprehensiveTests: string
  ) {
    return this.firstQuestionRepository.findFirstQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
      primaryQuestions,
      comprehensiveTests
    );
  }

  async findFirstTestsBasedOnComprehensiveTestId(
    comprehensiveTestIds: string[]
  ) {
    return this.firstQuestionRepository.findFirstTestsBasedOnComprehensiveTestId(
      comprehensiveTestIds
    );
  }

  update(
    @Res() res,
    id: string,
    updateFirstQuestionDto: UpdateFirstQuestionDto
  ) {
    return this.firstQuestionRepository.update(res, id, updateFirstQuestionDto);
  }

  remove(@Res() res, id: string) {
    return this.firstQuestionRepository.remove(res, id);
  }
}
