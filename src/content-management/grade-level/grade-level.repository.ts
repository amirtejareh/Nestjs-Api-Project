import { Injectable } from "@nestjs/common";
import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { InjectModel } from "@nestjs/mongoose";
import { GradeLevel } from "./entities/grade-level.entity";
import { Model } from "mongoose";

@Injectable()
export class GradeLevelRepository {
  constructor(
    @InjectModel("gradeLevel")
    private readonly gradeLevelModel: Model<GradeLevel>
  ) {}
  create(createGradeLevelDto: CreateGradeLevelDto) {
    return this.gradeLevelModel.create(createGradeLevelDto);
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
