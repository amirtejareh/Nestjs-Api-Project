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
    return this.gradeLevelModel.find({});
  }

  findOne(id: string) {
    return this.gradeLevelModel.findOne({ _id: id });
  }

  update(id: string, updateGradeLevelDto: UpdateGradeLevelDto) {
    return this.gradeLevelModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateGradeLevelDto } },
      { new: true }
    );
  }

  remove(id: string) {
    return this.gradeLevelModel.findOneAndRemove({ _id: id });
  }
}
