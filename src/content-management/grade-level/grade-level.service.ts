import { Injectable } from '@nestjs/common';
import { CreateGradeLevelDto } from './dto/create-grade-level.dto';
import { UpdateGradeLevelDto } from './dto/update-grade-level.dto';

@Injectable()
export class GradeLevelService {
  create(createGradeLevelDto: CreateGradeLevelDto) {
    return 'This action adds a new gradeLevel';
  }

  findAll() {
    return `This action returns all gradeLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gradeLevel`;
  }

  update(id: number, updateGradeLevelDto: UpdateGradeLevelDto) {
    return `This action updates a #${id} gradeLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} gradeLevel`;
  }
}
