import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subject } from "./entities/subject.entity";
import { Model } from "mongoose";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<Subject>
  ) {}

  async findOneByTitle(title: string) {
    return this.subjectModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() createSubjectDto: CreateSubjectDto) {
    try {
      if (await this.findOneByTitle(createSubjectDto.title)) {
        throw new ConflictException("درج موضوع تکراری امکان‌پذیر نمی‌باشد.");
      }

      const createSubjectModel = await this.subjectModel.create(
        createSubjectDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک موضوع با موفقیت ایجاد شد",
        data: createSubjectModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.subjectModel.find({});
  }

  findOne(@Param("id") id: string) {
    return this.subjectModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectDto: UpdateSubjectDto
  ) {
    try {
      const updateSubjectModel = await this.subjectModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateSubjectDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "موضوع مورد نظر با موفقیت بروزرسانی شد",
        data: updateSubjectModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی موضوع مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSubjectModel = await this.subjectModel.deleteOne({
        _id: id,
      });
      if (!deleteSubjectModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "موضوع مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "موضوع مورد نظر با موفقیت حذف شد",
        data: deleteSubjectModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف موضوع مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
