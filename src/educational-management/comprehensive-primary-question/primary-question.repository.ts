import { HttpStatus, Injectable, NotFoundException, Res } from "@nestjs/common";
import { CreatePrimaryQuestionDto } from "./dto/create-primary-question.dto";
import { UpdatePrimaryQuestionDto } from "./dto/update-primary-question.dto";
import { InjectModel } from "@nestjs/mongoose";
import { PrimaryQuestion } from "./entities/primary-question.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class PrimaryQuestionRepository {
  constructor(
    @InjectModel(PrimaryQuestion.name)
    private readonly primaryQuestionModel: Model<PrimaryQuestion>
  ) {}

  async findOneByTitle(title: string) {
    return this.primaryQuestionModel.findOne({ title }).exec();
  }

  async create(@Res() res, createPrimaryQuestionDto: CreatePrimaryQuestionDto) {
    try {
      const createPrimaryQuestion = await this.primaryQuestionModel.create(
        createPrimaryQuestionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال اصلی با موفقیت ایجاد شد.",
        data: createPrimaryQuestion,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findPrimaryTestsBasedOnComprehensiveTestId(
    comprehensiveTestIds: string[]
  ) {
    const primaryTests = await this.primaryQuestionModel
      .find({
        comprehensiveTestId: {
          $in: comprehensiveTestIds.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate("comprehensiveTestId");

    return primaryTests;
  }

  findAll() {
    return this.primaryQuestionModel
      .find({})
      .populate(["book", "gradeLevel", "chapter"]);
  }

  findOne(id: string) {
    return this.primaryQuestionModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    id: string,
    updatePrimaryQuestionDto: UpdatePrimaryQuestionDto
  ) {
    try {
      const primaryQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (!primaryQuestion) {
        throw new NotFoundException("سوال اصلی مورد نظر یافت نشد.");
      }

      const updatePrimaryQuestionModel =
        await this.primaryQuestionModel.findByIdAndUpdate(
          id,
          updatePrimaryQuestionDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال اصلی با موفقیت بروزرسانی شد.",
        data: updatePrimaryQuestionModel,
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
      const findPrimaryQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (findPrimaryQuestion) {
        const deleteBook = await this.primaryQuestionModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "سوال اصلی مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "سوال اصلی مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "سوال اصلی مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف سوال اصلی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
