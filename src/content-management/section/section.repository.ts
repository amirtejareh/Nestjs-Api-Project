import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from "@nestjs/common";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Section } from "./entities/section.entity";
import { Model } from "mongoose";

@Injectable()
export class SectionRepository {
  constructor(
    @InjectModel(Section.name)
    private readonly sectionModel: Model<Section>
  ) {}

  async findOneByTitle(title: string) {
    return this.sectionModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() createSectionDto: CreateSectionDto) {
    try {
      if (await this.findOneByTitle(createSectionDto.title)) {
        throw new ConflictException("درج بخش تکراری امکان‌پذیر نمی‌باشد.");
      }

      const createSectionModel = await this.sectionModel.create(
        createSectionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک بخش با موفقیت ایجاد شد",
        data: createSectionModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.sectionModel.find({});
  }

  findOne(@Param("id") id: string) {
    return this.sectionModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ) {
    try {
      const updateSectionModel = await this.sectionModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateSectionDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "بخش مورد نظر با موفقیت بروزرسانی شد",
        data: updateSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی بخش مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSectionModel = await this.sectionModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "فصل مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "فصل مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف فصل مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
