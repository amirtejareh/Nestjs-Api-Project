import { Body, Injectable, Param, ParseArrayPipe, Res } from "@nestjs/common";
import { ObjectiveTestManagementRepository } from "./objective-test-management.repository";
import { CreateObjectiveTestManagementDto } from "./dto/create-objective-test-management.dto";
import { UpdateObjectiveTestManagementDto } from "./dto/update-objective-test-management.dto";

@Injectable()
export class ObjectiveTestManagementService {
  constructor(
    private readonly objectiveTestRepository: ObjectiveTestManagementRepository
  ) {}

  create(
    @Res() res,
    @Body() createObjectiveTestManagementDto: CreateObjectiveTestManagementDto
  ) {
    return this.objectiveTestRepository.create(
      res,
      createObjectiveTestManagementDto
    );
  }

  findAll() {
    return this.objectiveTestRepository.findAll();
  }

  findOne(@Param("id") id: string) {
    return this.objectiveTestRepository.findOne(id);
  }

  getObjectiveTestsBasedNumber(
    @Param("objectiveTestId") objectiveTests: string
  ) {
    return this.objectiveTestRepository.getObjectiveTestsBasedNumber(
      objectiveTests
    );
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateObjectiveTestManagementDto: UpdateObjectiveTestManagementDto
  ) {
    return this.objectiveTestRepository.update(
      res,
      id,
      updateObjectiveTestManagementDto
    );
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.objectiveTestRepository.remove(res, id);
  }
}
