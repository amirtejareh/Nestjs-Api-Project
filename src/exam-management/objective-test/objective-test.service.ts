import { Body, Injectable, Param, Res } from "@nestjs/common";
import { CreateObjectiveTestDto } from "./dto/create-objective-test.dto";
import { UpdateObjectiveTestDto } from "./dto/update-objective-test.dto";
import { ObjectiveTestRepository } from "./objective-test.repository";

@Injectable()
export class ObjectiveTestService {
  constructor(
    private readonly objectiveTestRepository: ObjectiveTestRepository
  ) {}

  create(@Res() res, @Body() createObjectiveTestDto: CreateObjectiveTestDto) {
    return this.objectiveTestRepository.create(res, createObjectiveTestDto);
  }

  findAll() {
    return this.objectiveTestRepository.findAll();
  }

  async findObjectiveTestsBasedOnGradeLevels(
    page: number = 1,
    limit: number = 10,
    gradeLevels: string[]
  ) {
    return this.objectiveTestRepository.findObjectiveTestsBasedOnGradeLevels(
      page,
      limit,
      gradeLevels
    );
  }

  findOne(@Param("id") id: string) {
    return this.objectiveTestRepository.findOne(id);
  }

  findMainObjectiveTest() {
    return this.objectiveTestRepository.findMainObjectiveTest();
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateObjectiveTestDto: UpdateObjectiveTestDto
  ) {
    return this.objectiveTestRepository.update(res, id, updateObjectiveTestDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.objectiveTestRepository.remove(res, id);
  }
}
