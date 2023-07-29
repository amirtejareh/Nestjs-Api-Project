import { Injectable, Res } from "@nestjs/common";
import { CreateTermOfStudyDto } from "./dto/create-term-of-study.dto";
import { UpdateTermOfStudyDto } from "./dto/update-term-of-study.dto";
import { TermOfStudyRepository } from "./term-of-study.repository";

@Injectable()
export class TermOfStudyService {
  constructor(private termOfStudyRepository: TermOfStudyRepository) {}

  create(@Res() res, createTermOfStudyDto: CreateTermOfStudyDto) {
    return this.termOfStudyRepository.create(res, createTermOfStudyDto);
  }

  findAll() {
    return this.termOfStudyRepository.findAll();
  }

  findOne(id: string) {
    return this.termOfStudyRepository.findOne(id);
  }

  update(@Res() res, id: string, updateTermOfStudyDto: UpdateTermOfStudyDto) {
    return this.termOfStudyRepository.update(res, id, updateTermOfStudyDto);
  }

  remove(@Res() res, id: string) {
    return this.termOfStudyRepository.remove(res, id);
  }
}
