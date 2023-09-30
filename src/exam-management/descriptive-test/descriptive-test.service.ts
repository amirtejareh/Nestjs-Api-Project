import { Body, Injectable, Param, Res } from "@nestjs/common";
import { CreateDescriptiveTestDto } from "./dto/create-descriptive-test.dto";
import { UpdateDescriptiveTestDto } from "./dto/update-descriptive-test.dto";
import { DescriptiveTestRepository } from "./descriptive-test.repository";

@Injectable()
export class DescriptiveTestService {
  constructor(
    private readonly descriptiveTestRepository: DescriptiveTestRepository
  ) { }

  create(@Res() res, @Body() createDescriptiveTestDto: CreateDescriptiveTestDto) {
    return this.descriptiveTestRepository.create(res, createDescriptiveTestDto);
  }

  findAll() {
    return this.descriptiveTestRepository.findAll();
  }

  async findDescriptiveTestsBasedOnGradeLevels(
    page: number = 1,
    limit: number = 10,
    gradeLevels: string[]
  ) {
    return this.descriptiveTestRepository.findDescriptiveTestsBasedOnGradeLevels(
      page,
      limit,
      gradeLevels
    );
  }

  findOne(@Param("id") id: string) {
    return this.descriptiveTestRepository.findOne(id);
  }

  findMainDescriptiveTest() {
    return this.descriptiveTestRepository.findMainDescriptiveTest();
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateDescriptiveTestDto: UpdateDescriptiveTestDto
  ) {
    return this.descriptiveTestRepository.update(res, id, updateDescriptiveTestDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.descriptiveTestRepository.remove(res, id);
  }
}
