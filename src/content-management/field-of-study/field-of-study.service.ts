import { Injectable, Res } from "@nestjs/common";
import { CreateFieldOfStudyDto } from "./dto/create-field-of-study.dto";
import { UpdateFieldOfStudyDto } from "./dto/update-field-of-study.dto";
import { FieldOfStudyRepository } from "./field-of-study.repository";

@Injectable()
export class FieldOfStudyService {
  constructor(private filedOfStudyRepository: FieldOfStudyRepository) {}

  create(@Res() res, createFieldOfStudyDto: CreateFieldOfStudyDto) {
    return this.filedOfStudyRepository.create(res, createFieldOfStudyDto);
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

  remove(@Res() res, id: string) {
    return this.filedOfStudyRepository.remove(res, id);
  }
}
