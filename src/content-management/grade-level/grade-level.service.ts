import { Injectable } from "@nestjs/common";
import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { GradeLevelRepository } from "./grade-level.repository";

@Injectable()
export class GradeLevelService {
  constructor(private gradeLevelRepository: GradeLevelRepository) {}

  create(createGradeLevelDto: CreateGradeLevelDto) {
    return this.gradeLevelRepository.create(createGradeLevelDto);
  }

  findAll() {
    return this.gradeLevelRepository.findAll();
  }

  findOne(id: string) {
    return this.gradeLevelRepository.findOne(id);
  }

  update(id: string, updateGradeLevelDto: UpdateGradeLevelDto) {
    return this.gradeLevelRepository.update(id, updateGradeLevelDto);
  }

  remove(id: string) {
    return this.gradeLevelRepository.remove(id);
  }
}
