import { Body, Injectable, Param, Query, Req, Res } from "@nestjs/common";
import { CreateStandardDto } from "./dto/create-standard.dto";
import { UpdateStandardDto } from "./dto/update-standard.dto";
import { StandardRepository } from "./standard.repository";

@Injectable()
export class StandardService {
  constructor(private readonly standardRepository: StandardRepository) {}

  create(@Res() res, @Body() createStandardDto: CreateStandardDto) {
    return this.standardRepository.create(res, createStandardDto);
  }

  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.standardRepository.findAll(page, limit);
  }

  async findStandardsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    return this.standardRepository.findStandardsBasedOnBooks(
      page,
      limit,
      books
    );
  }

  findOne(@Param("id") id: string) {
    return this.standardRepository.findOne(id);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateStandardDto: UpdateStandardDto
  ) {
    return this.standardRepository.update(res, id, updateStandardDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.standardRepository.remove(res, id);
  }
}
