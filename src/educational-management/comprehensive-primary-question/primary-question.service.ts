import { Injectable, Res } from "@nestjs/common";
import { CreatePrimaryQuestionDto } from "./dto/create-primary-question.dto";
import { UpdatePrimaryQuestionDto } from "./dto/update-primary-question.dto";
import { PrimaryQuestionRepository } from "./primary-question.repository";

@Injectable()
export class PrimaryQuestionService {
  constructor(
    private readonly primaryQuestionRepository: PrimaryQuestionRepository
  ) {}

  create(@Res() res, createPrimaryQuestionDto: CreatePrimaryQuestionDto) {
    return this.primaryQuestionRepository.create(res, createPrimaryQuestionDto);
  }

  findAll() {
    return this.primaryQuestionRepository.findAll();
  }

  findOne(id: string) {
    return this.primaryQuestionRepository.findOne(id);
  }

  async findPrimaryTestsBasedOnComprehensiveTestId(
    page: number = 1,
    limit: number = 10,
    comprehensiveTestIds: string[]
  ) {
    return this.primaryQuestionRepository.findPrimaryTestsBasedOnComprehensiveTestId(
      page,
      limit,
      comprehensiveTestIds
    );
  }

  update(
    @Res() res,
    id: string,
    updatePrimaryQuestionDto: UpdatePrimaryQuestionDto
  ) {
    return this.primaryQuestionRepository.update(
      res,
      id,
      updatePrimaryQuestionDto
    );
  }

  remove(@Res() res, id: string) {
    return this.primaryQuestionRepository.remove(res, id);
  }
}
