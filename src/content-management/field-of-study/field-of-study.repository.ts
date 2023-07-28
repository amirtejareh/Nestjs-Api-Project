import { ConflictException, Injectable, Res } from "@nestjs/common";
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

  async findOneByTitle(title: string) {
    return this.fieldOfStudyModel.findOne({ title }).exec();
  }

  async create(@Res() res, createFieldOfStudyDto: CreateFieldOfStudyDto) {
    try {
      if (await this.findOneByTitle(createFieldOfStudyDto.title)) {
        throw new ConflictException(
          "رشته تحصیلی با این عنوان در پایگاه داده موجود است"
        );
      }

      const createdFieldOfStudy = await this.fieldOfStudyModel.create(
        createFieldOfStudyDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک رشته تحصیلی با موفقیت ایجاد شد",
        data: createdFieldOfStudy,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
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
