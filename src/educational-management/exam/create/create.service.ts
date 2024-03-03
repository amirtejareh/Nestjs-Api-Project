import { Body, Injectable, Param, Query, Req, Res } from "@nestjs/common";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { CreateExamRepository } from "./create.repository";

@Injectable()
export class CreateExamService {
  constructor(private readonly createExamRepository: CreateExamRepository) {}

  create(@Res() res, @Body() createCreateExamDto: CreateCreateExamDto) {
    return this.createExamRepository.create(res, createCreateExamDto);
  }

  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.createExamRepository.findAll(page, limit);
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
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    return this.createExamRepository.update(res, id, updateCreateExamDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.createExamRepository.remove(res, id);
  }
}
