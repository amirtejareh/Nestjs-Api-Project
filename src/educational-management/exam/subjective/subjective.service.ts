import { Body, Injectable, Param, Query, Res } from "@nestjs/common";
import { SubjectiveRepository } from "./subjective.repository";
import { CreateSubjectiveDto } from "./dto/create-subjective.dto";
import { UpdateSubjectiveDto } from "./dto/update-subjective.dto";

@Injectable()
export class SubjectiveService {
  constructor(private readonly subjectiveRepository: SubjectiveRepository) {}

  create(@Res() res, @Body() createSubjectiveDto: CreateSubjectiveDto) {
    return this.subjectiveRepository.create(res, createSubjectiveDto);
  }

  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.subjectiveRepository.findAll(page, limit);
  }

  async findSubjectivesBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    return this.subjectiveRepository.findSubjectivesBasedOnBooks(
      page,
      limit,
      books
    );
  }

  findOne(@Param("id") id: string) {
    return this.subjectiveRepository.findOne(id);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectiveDto: UpdateSubjectiveDto
  ) {
    return this.subjectiveRepository.update(res, id, updateSubjectiveDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.subjectiveRepository.remove(res, id);
  }
}
