import { ConflictException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { CreateTermOfStudyDto } from "./dto/create-term-of-study.dto";
import { UpdateTermOfStudyDto } from "./dto/update-term-of-study.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TermOfStudy } from "./entities/term-of-study.entity";

@Injectable()
export class TermOfStudyRepository {
  constructor(
    @InjectModel("termOfStudy")
    private readonly termOfStudylModel: Model<TermOfStudy>
  ) {}

  async findOneByTitle(title: string) {
    return this.termOfStudylModel.findOne({ title }).exec();
  }

  async create(@Res() res, createTermOfStudyDto: CreateTermOfStudyDto) {
    try {
      if (await this.findOneByTitle(createTermOfStudyDto.title)) {
        throw new ConflictException(
          "درج ترم تحصیلی تکراری امکان‌پذیر نمی‌باشد."
        );
      }

      const createTermOfStudyModel = await this.termOfStudylModel.create(
        createTermOfStudyDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک ترم تحصیلی با موفقیت ایجاد شد",
        data: createTermOfStudyModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.termOfStudylModel.find({});
  }

  findOne(id: string) {
    return this.termOfStudylModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    id: string,
    updateTermOfStudyDto: UpdateTermOfStudyDto
  ) {
    try {
      const updateTermOfStudyModel =
        await this.termOfStudylModel.findOneAndUpdate(
          { _id: id },
          { $set: { ...updateTermOfStudyDto } },
          { new: true }
        );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "ترم تحصیلی با موفقیت بروزرسانی شد",
        data: updateTermOfStudyModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی ترم تحصیلی به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, id: string) {
    try {
      const deleteTermOfStudylModel = await this.termOfStudylModel.deleteOne({
        _id: id,
      });
      if (!deleteTermOfStudylModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "ترم تحصیلی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "ترم تحصیلی با موفقیت حذف شد",
        data: deleteTermOfStudylModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف ترم تحصیلی به وجود آمده است",
        error: error.message,
      });
    }
  }
}
