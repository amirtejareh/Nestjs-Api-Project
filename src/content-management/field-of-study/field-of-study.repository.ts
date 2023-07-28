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
