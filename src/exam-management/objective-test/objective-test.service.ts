import { Injectable } from "@nestjs/common";
import { CreateObjectiveTestDto } from "./dto/create-objective-test.dto";
import { UpdateObjectiveTestDto } from "./dto/update-objective-test.dto";

@Injectable()
export class ObjectiveTestService {
  create(createObjectiveTestDto: CreateObjectiveTestDto) {
    return "This action adds a new objectiveTest";
  }

  findAll() {
    return `This action returns all objectiveTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} objectiveTest`;
  }

  update(id: number, updateObjectiveTestDto: UpdateObjectiveTestDto) {
    return `This action updates a #${id} objectiveTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} objectiveTest`;
  }
}
