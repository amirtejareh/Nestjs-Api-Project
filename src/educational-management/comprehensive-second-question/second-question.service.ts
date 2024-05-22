import { Injectable, Res } from "@nestjs/common";
import { CreateSecondQuestionDto } from "./dto/create-second-question.dto";
import { UpdateSecondQuestionDto } from "./dto/update-second-question-question.dto";
import { SecondQuestionRepository } from "./second-question.repository";

@Injectable()
export class SecondQuestionService {
  constructor(
    private readonly firstQuestionRepository: SecondQuestionRepository
  ) {}

  create(@Res() res, createSecondQuestionDto: CreateSecondQuestionDto) {
    return this.firstQuestionRepository.create(res, createSecondQuestionDto);
  }

  findAll() {
    return this.firstQuestionRepository.findAll();
  }

  findOne(id: string) {
    return this.firstQuestionRepository.findOne(id);
  }

  async findSecondQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    primaryQuestions: string,
    comprehensiveTests: string
  ) {
    return this.firstQuestionRepository.findSecondQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
      primaryQuestions,
      comprehensiveTests
    );
  }

  async findSecondTestsBasedOnComprehensiveTestId(
    comprehensiveTestIds: string[]
  ) {
    return this.firstQuestionRepository.findSecondTestsBasedOnComprehensiveTestId(
      comprehensiveTestIds
    );
  }

  update(
    @Res() res,
    id: string,
    updateSecondQuestionDto: UpdateSecondQuestionDto
  ) {
    return this.firstQuestionRepository.update(
      res,
      id,
      updateSecondQuestionDto
    );
  }

  remove(@Res() res, id: string) {
    return this.firstQuestionRepository.remove(res, id);
  }
}
