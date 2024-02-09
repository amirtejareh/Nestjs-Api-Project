import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateSampleExampleQuestionsDto } from "./dto/create-sample-example-question.dto";
import { UpdateSampleExampleQuestionsDto } from "./dto/update-sample-example-question.dto";
import { SampleExampleQuestionsRepository } from "./sample-example-questions.repository";

@Injectable()
export class SampleExampleQuestionsService {
  constructor(
    private readonly sampleExampleQuestionsRepository: SampleExampleQuestionsRepository
  ) {}

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createSampleExampleQuestionsDto: CreateSampleExampleQuestionsDto
  ) {
    return this.sampleExampleQuestionsRepository.create(
      res,
      pdfFiles,
      createSampleExampleQuestionsDto
    );
  }

  findAll() {
    return this.sampleExampleQuestionsRepository.findAll();
  }

  findOne(id: string) {
    return this.sampleExampleQuestionsRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.sampleExampleQuestionsRepository.findBasedOnSubjects(subjects);
  }

  async findBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.sampleExampleQuestionsRepository.findBasedOnBooks(books);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateSampleExampleQuestionsDto: UpdateSampleExampleQuestionsDto
  ) {
    return this.sampleExampleQuestionsRepository.update(
      res,
      pdfFiles,
      id,
      updateSampleExampleQuestionsDto
    );
  }

  remove(@Res() res, id: string) {
    return this.sampleExampleQuestionsRepository.remove(res, id);
  }
}
