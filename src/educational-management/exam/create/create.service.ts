import {
  Body,
  Injectable,
  Param,
  Query,
  Req,
  Res,
  UploadedFiles,
} from "@nestjs/common";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { CreateExamRepository } from "./create.repository";

@Injectable()
export class CreateExamService {
  constructor(private readonly createExamRepository: CreateExamRepository) {}

  create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() createCreateExamDto: CreateCreateExamDto
  ) {
    return this.createExamRepository.create(
      res,
      AnswerSheetSourcePdfFile,
      createCreateExamDto
    );
  }

  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.createExamRepository.findAll(page, limit);
  }

  findAllCreateExamsBasedOnStandardExam(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    return this.createExamRepository.findAllCreateExamsBasedOnStandardExam(
      page,
      limit
    );
  }

  async findCreateStandardExamsBasedOnChapters(
    page: number = 1,
    limit: number = 10,
    chapters: string
  ) {
    return this.createExamRepository.findCreateStandardExamsBasedOnChapters(
      page,
      limit,
      chapters
    );
  }

  async findCreateStandardExamsBasedOnTerms(
    page: number = 1,
    limit: number = 10,
    terms: string
  ) {
    return this.createExamRepository.findCreateStandardExamsBasedOnTerms(
      page,
      limit,
      terms
    );
  }

  async findCreateSubjectiveExamsBasedOnSubjects(
    page: number = 1,
    limit: number = 10,
    subjects: string
  ) {
    return this.createExamRepository.findCreateSubjectiveExamsBasedOnSubjects(
      page,
      limit,
      subjects
    );
  }

  findAllCreateExamsBasedOnSubjectiveExam(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    return this.createExamRepository.findAllCreateExamsBasedOnSubjectiveExam(
      page,
      limit
    );
  }

  async findCreateExamsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    return this.createExamRepository.findCreateExamsBasedOnBooks(
      page,
      limit,
      books
    );
  }

  findOne(@Param("id") id: string) {
    return this.createExamRepository.findOne(id);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    return this.createExamRepository.update(
      res,
      id,
      AnswerSheetSourcePdfFile,
      updateCreateExamDto
    );
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.createExamRepository.remove(res, id);
  }
}
