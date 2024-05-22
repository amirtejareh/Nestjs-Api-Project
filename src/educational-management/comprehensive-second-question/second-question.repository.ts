import { HttpStatus, Injectable, NotFoundException, Res } from "@nestjs/common";
import { CreateSecondQuestionDto } from "./dto/create-second-question.dto";
import { UpdateSecondQuestionDto } from "./dto/update-second-question-question.dto";
import { InjectModel } from "@nestjs/mongoose";
import { SecondQuestion } from "./entities/second-question.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class SecondQuestionRepository {
  constructor(
    @InjectModel(SecondQuestion.name)
    private readonly primaryQuestionModel: Model<SecondQuestion>
  ) {}

  async findOneByTitle(title: string) {
    return this.primaryQuestionModel.findOne({ title }).exec();
  }

  async create(@Res() res, createSecondQuestionDto: CreateSecondQuestionDto) {
    try {
      const createSecondQuestion = await this.primaryQuestionModel.create(
        createSecondQuestionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال مشابه دوم با موفقیت ایجاد شد.",
        data: createSecondQuestion,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findSecondQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    primaryQuestions: string,
    comprehensiveTests: string
  ) {
    const firstQuestion = await this.primaryQuestionModel.find({
      primaryQuestionId: primaryQuestions,
      comprehensiveTestId: comprehensiveTests,
    });

    return firstQuestion;
  }

  async findSecondTestsBasedOnComprehensiveTestId(
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
    updateSecondQuestionDto: UpdateSecondQuestionDto
  ) {
    try {
      const primaryQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (!primaryQuestion) {
        throw new NotFoundException("سوال مشابه دوم مورد نظر یافت نشد.");
      }

      const updateSecondQuestionModel =
        await this.primaryQuestionModel.findByIdAndUpdate(
          id,
          updateSecondQuestionDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال مشابه دوم با موفقیت بروزرسانی شد.",
        data: updateSecondQuestionModel,
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
      const findSecondQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (findSecondQuestion) {
        const deleteBook = await this.primaryQuestionModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "سوال مشابه دوم مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "سوال مشابه دوم مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "سوال مشابه دوم مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف سوال مشابه دوم مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
