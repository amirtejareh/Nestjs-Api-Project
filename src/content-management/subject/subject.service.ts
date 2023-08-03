import { Body, Injectable, Param, Res } from "@nestjs/common";
import { SubjectRepository } from "./subject.repository";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  create(@Res() res, @Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.create(res, createSubjectDto);
  }

  findAll() {
    return this.subjectRepository.findAll();
  }

  findOne(@Param("id") id: string) {
    return this.subjectRepository.findOne(id);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectDto: UpdateSubjectDto
  ) {
    return this.subjectRepository.update(res, id, updateSubjectDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.subjectRepository.remove(res, id);
  }
}
