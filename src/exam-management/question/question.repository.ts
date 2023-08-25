import { Body, HttpStatus, Injectable, Param, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Question } from "./entities/question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>
  ) {}

  async findOneByTitle(title: string) {
    return this.questionModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() CreateQuestionDto: CreateQuestionDto) {
    try {
      const createQuestionModel = await this.questionModel.create(
        CreateQuestionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "شناسنامه سوال با موفقیت ایجاد شد",
        data: createQuestionModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.questionModel.find({});
  }

  async findBooksBasedOnObjectiveTests(objectiveTests: string) {
    const books = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .populate("books");
    return books;
  }

  findOne(@Param("id") id: string) {
    return this.questionModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    try {
      const updateQuestionModel = await this.questionModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateQuestionDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "شناسنامه سوال مورد نظر با موفقیت بروزرسانی شد",
        data: updateQuestionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی شناسنامه سوال مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSectionModel = await this.questionModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "بخش مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "بخش مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف بخش مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
