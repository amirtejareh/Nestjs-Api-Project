import { ConflictException, HttpStatus, Injectable, Res } from "@nestjs/common";
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

  async findOneByTitle(title: string) {
    return this.gradeLevelModel.findOne({ title }).exec();
  }
  async create(@Res() res, createGradeLevelDto: CreateGradeLevelDto) {
    try {
      if (await this.findOneByTitle(createGradeLevelDto.title)) {
        throw new ConflictException(
          "درج پایه تحصیلی تکراری امکان‌پذیر نمی‌باشد."
        );
      }

      const createdGradeLevelModel = await this.gradeLevelModel.create(
        createGradeLevelDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک پایه تحصیلی با موفقیت ایجاد شد",
        data: createdGradeLevelModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.gradeLevelModel.find({});
  }

  findOne(id: string) {
    return this.gradeLevelModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    id: string,
    updateGradeLevelDto: UpdateGradeLevelDto
  ) {
    try {
      const updateGradeLevelModel = await this.gradeLevelModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateGradeLevelDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "پایه تحصیلی با موفقیت بروزرسانی شد",
        data: updateGradeLevelModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی پایه تحصیلی به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, id: string) {
    try {
      const deleteGradeLevelModel = await this.gradeLevelModel.deleteOne({
        _id: id,
      });
      if (!deleteGradeLevelModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "پایه تحصیلی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "پایه تحصیلی با موفقیت حذف شد",
        data: deleteGradeLevelModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف پایه تحصیلی به وجود آمده است",
        error: error.message,
      });
    }
  }
}
