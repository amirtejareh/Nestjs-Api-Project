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
    return this.filedOfStudyRepository.findAll();
  }

  findOne(id: string) {
    return this.filedOfStudyRepository.findOne(id);
  }

  update(id: string, updateFieldOfStudyDto: UpdateFieldOfStudyDto) {
    return this.filedOfStudyRepository.update(id, updateFieldOfStudyDto);
  }

  remove(id: string) {
    return this.filedOfStudyRepository.remove(id);
  }
}
