import { Injectable } from "@nestjs/common";
import { CreateFieldOfStudyDto } from "./dto/create-field-of-study.dto";
import { UpdateFieldOfStudyDto } from "./dto/update-field-of-study.dto";
import { InjectModel } from "@nestjs/mongoose";
import { FieldOfStudy } from "./entities/field-of-study.entity";
import { FieldOfStudyService } from "./field-of-study.service";
import { Model } from "mongoose";

@Injectable()
export class FieldOfStudyRepository {
  constructor(
    @InjectModel("fieldOfStudy")
    private readonly fieldOfStudyModel: Model<FieldOfStudy>
  ) {}

  create(createFieldOfStudyDto: CreateFieldOfStudyDto) {
    return this.fieldOfStudyModel.create({
      ...createFieldOfStudyDto,
    });
  }

  findAll() {
    return this.fieldOfStudyModel.find({});
  }

  findOne(id: string) {
    return this.fieldOfStudyModel.findOne({ _id: id });
  }

  update(id: string, updateFieldOfStudyDto: UpdateFieldOfStudyDto) {
    return this.fieldOfStudyModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateFieldOfStudyDto } },
      { new: true }
    );
  }

  remove(id: string) {
    return this.fieldOfStudyModel.findOneAndRemove({ _id: id });
  }
}
