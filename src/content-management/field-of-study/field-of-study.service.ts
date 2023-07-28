import { Injectable } from "@nestjs/common";
import { CreateFieldOfStudyDto } from "./dto/create-field-of-study.dto";
import { UpdateFieldOfStudyDto } from "./dto/update-field-of-study.dto";
import { FieldOfStudyRepository } from "./field-of-study.repository";

@Injectable()
export class FieldOfStudyService {
  constructor(private filedOfStudyRepository: FieldOfStudyRepository) {}

  create(createFieldOfStudyDto: CreateFieldOfStudyDto) {
    return this.filedOfStudyRepository.create(createFieldOfStudyDto);
  }

  findAll() {
    return `This action returns all fieldOfStudy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldOfStudy`;
  }

  update(id: number, updateFieldOfStudyDto: UpdateFieldOfStudyDto) {
    return `This action updates a #${id} fieldOfStudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldOfStudy`;
  }
}
