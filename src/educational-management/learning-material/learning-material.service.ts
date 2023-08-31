import { Injectable, Res, UploadedFile } from '@nestjs/common';
import { CreateLearningMaterialDto } from './dto/create-learning-material.dto';
import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';
import { LearningMaterialRepository } from './learning-material.repository';

@Injectable()
export class LearningMaterialService {
  constructor(private readonly learningMaterialRepository: LearningMaterialRepository) { }

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createLearningMaterialDto: CreateLearningMaterialDto
  ) {

    return this.learningMaterialRepository.create(res, pdfFiles, createLearningMaterialDto);
  }

  findAll() {
    return this.learningMaterialRepository.findAll();
  }

  findOne(id: string) {
    return this.learningMaterialRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.learningMaterialRepository.findBasedOnSubjects(subjects);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateLearningMaterialDto: UpdateLearningMaterialDto
  ) {
    return this.learningMaterialRepository.update(res, pdfFiles, id, updateLearningMaterialDto);
  }

  remove(@Res() res, id: string) {
    return this.learningMaterialRepository.remove(res, id);
  }
}
