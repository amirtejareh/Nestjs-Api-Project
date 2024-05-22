import { HttpStatus, Injectable, NotFoundException, Res } from "@nestjs/common";
import { CreateFirstQuestionDto } from "./dto/create-first-question.dto";
import { UpdateFirstQuestionDto } from "./dto/update-first-question-question.dto";
import { InjectModel } from "@nestjs/mongoose";
import { FirstQuestion } from "./entities/first-question.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class FirstQuestionRepository {
  constructor(
    @InjectModel(FirstQuestion.name)
    private readonly primaryQuestionModel: Model<FirstQuestion>
  ) {}

  async findOneByTitle(title: string) {
    return this.primaryQuestionModel.findOne({ title }).exec();
  }

  async create(@Res() res, createFirstQuestionDto: CreateFirstQuestionDto) {
    try {
      const createFirstQuestion = await this.primaryQuestionModel.create(
        createFirstQuestionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال مشابه اول با موفقیت ایجاد شد.",
        data: createFirstQuestion,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findFirstQuestionBasedOnPrimaryQuestionIdAndComprehensiveTestId(
    primaryQuestions: string,
    comprehensiveTests: string
  ) {
    const firstQuestion = await this.primaryQuestionModel.find({
      primaryQuestionId: primaryQuestions,
      comprehensiveTestId: comprehensiveTests,
    });

    return firstQuestion;
  }

  async findFirstTestsBasedOnComprehensiveTestId(
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
    updateFirstQuestionDto: UpdateFirstQuestionDto
  ) {
    try {
      const primaryQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (!primaryQuestion) {
        throw new NotFoundException("سوال مشابه اول مورد نظر یافت نشد.");
      }

      const updateFirstQuestionModel =
        await this.primaryQuestionModel.findByIdAndUpdate(
          id,
          updateFirstQuestionDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال مشابه اول با موفقیت بروزرسانی شد.",
        data: updateFirstQuestionModel,
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
      const findFirstQuestion = await this.primaryQuestionModel.findOne({
        _id: id,
      });

      if (findFirstQuestion) {
        const deleteBook = await this.primaryQuestionModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "سوال مشابه اول مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "سوال مشابه اول مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "سوال مشابه اول مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف سوال مشابه اول مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
