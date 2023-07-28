import { Injectable } from '@nestjs/common';
import { CreateTermOfStudyDto } from './dto/create-term-of-study.dto';
import { UpdateTermOfStudyDto } from './dto/update-term-of-study.dto';

@Injectable()
export class TermOfStudyService {
  create(createTermOfStudyDto: CreateTermOfStudyDto) {
    return 'This action adds a new termOfStudy';
  }

  findAll() {
    return `This action returns all termOfStudy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termOfStudy`;
  }

  update(id: number, updateTermOfStudyDto: UpdateTermOfStudyDto) {
    return `This action updates a #${id} termOfStudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} termOfStudy`;
  }
}
