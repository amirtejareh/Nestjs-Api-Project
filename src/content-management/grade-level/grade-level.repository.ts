import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import * as fs from "fs";

import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { InjectModel } from "@nestjs/mongoose";
import { GradeLevel } from "./entities/grade-level.entity";
import { Model } from "mongoose";
import { ImageService } from "../../common/services/imageService";

@Injectable()
export class GradeLevelRepository {
  constructor(
    @InjectModel("gradeLevel")
    private readonly gradeLevelModel: Model<GradeLevel>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.gradeLevelModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @UploadedFile() file,
    createGradeLevelDto: CreateGradeLevelDto
  ) {
    try {
      if (await this.findOneByTitle(createGradeLevelDto.title)) {
        throw new ConflictException(
          "درج پایه تحصیلی تکراری امکان‌پذیر نمی‌باشد."
        );
      }

      if (file) {
        const fileName = await this.imageService.saveImage(
          "image_grade_level",
          file
        );
        createGradeLevelDto.image = fileName;
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
    @UploadedFile() file,
    @Param("id") id: string,
    updateGradeLevelDto: UpdateGradeLevelDto
  ) {
    try {
      const gradeLevel = await this.gradeLevelModel.findById(id);

      if (!gradeLevel) {
        throw new NotFoundException("پایه تحصیلی مورد نظر یافت نشد.");
      }

      if (file) {
        const fileName = await this.imageService.saveImage(
          "image_grade_level",
          file
        );
        updateGradeLevelDto.image = fileName;

        try {
          fs.writeFileSync(`./${fileName}`, file.buffer);
        } catch (err) {
          throw new InternalServerErrorException(
            "خطایی در حذف ذخیره فایل رخ داده است."
          );
        }

        if (gradeLevel.image) {
          try {
            fs.unlinkSync(`${gradeLevel.image}`);
          } catch (err) {
            console.log(err);

            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }
      }

      const updatedGradeLevelModel =
        await this.gradeLevelModel.findByIdAndUpdate(id, updateGradeLevelDto, {
          new: true,
        });

      return res.status(200).json({
        statusCode: 200,
        message: "پایه تحصیلی با موفقیت بروزرسانی شد.",
        data: updatedGradeLevelModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
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
