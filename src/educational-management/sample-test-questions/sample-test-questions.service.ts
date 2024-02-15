import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { UpdateSampleTestQuestionsDto } from "./dto/update-sample-test-question.dto";
import { CreateSampleTestQuestionsDto } from "./dto/create-sample-test-question.dto";
import { SampleTestQuestionsRepository } from "./sample-test-questions.repository";

@Injectable()
export class SampleTestQuestionsService {
  constructor(
    private readonly sampleTestQuestionsRepository: SampleTestQuestionsRepository
  ) {}

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createSampleTestQuestionsDto: CreateSampleTestQuestionsDto
  ) {
    return this.sampleTestQuestionsRepository.create(
      res,
      pdfFiles,
      createSampleTestQuestionsDto
    );
  }

  findAll() {
    return this.sampleTestQuestionsRepository.findAll();
  }

  findOne(id: string) {
    return this.sampleTestQuestionsRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.sampleTestQuestionsRepository.findBasedOnSubjects(subjects);
  }

  async findBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.sampleTestQuestionsRepository.findBasedOnBooks(books);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateSampleTestQuestionsDto: UpdateSampleTestQuestionsDto
  ) {
    return this.sampleTestQuestionsRepository.update(
      res,
      pdfFiles,
      id,
      updateSampleTestQuestionsDto
    );
  }

  remove(@Res() res, id: string) {
    return this.sampleTestQuestionsRepository.remove(res, id);
  }
}
