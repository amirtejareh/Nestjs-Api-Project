import { Injectable, Res, UploadedFile } from '@nestjs/common';
import { CreateEssayQuestionsDto } from './dto/create-essay-questions.dto';
import { UpdateEssayQuestionDto } from './dto/update-essay-questions.dto';
import { EssayQuestionRepository } from './essay-questions.repository';

@Injectable()
export class EssayQuestionService {
  constructor(private readonly essayQuestionRepository: EssayQuestionRepository) { }

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createEssayQuestionsDto: CreateEssayQuestionsDto
  ) {

    return this.essayQuestionRepository.create(res, pdfFiles, createEssayQuestionsDto);
  }

  findAll() {
    return this.essayQuestionRepository.findAll();
  }

  findOne(id: string) {
    return this.essayQuestionRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.essayQuestionRepository.findBasedOnSubjects(subjects);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateEssayQuestionDto: UpdateEssayQuestionDto
  ) {
    return this.essayQuestionRepository.update(res, pdfFiles, id, updateEssayQuestionDto);
  }

  remove(@Res() res, id: string) {
    return this.essayQuestionRepository.remove(res, id);
  }
}
