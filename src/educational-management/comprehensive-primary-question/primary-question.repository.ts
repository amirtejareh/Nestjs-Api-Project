import { HttpStatus, Injectable, NotFoundException, Res } from "@nestjs/common";
import { CreatePrimaryQuestionDto } from "./dto/create-primary-question.dto";
import { UpdatePrimaryQuestionDto } from "./dto/update-primary-question.dto";
import { InjectModel } from "@nestjs/mongoose";
import { PrimaryQuestion } from "./entities/primary-question.entity";
import { Model, Types } from "mongoose";
import { FirstQuestion } from "../comprehensive-first-question/entities/first-question.entity";
import { SecondQuestion } from "../comprehensive-second-question/entities/second-question.entity";

@Injectable()
export class PrimaryQuestionRepository {
  constructor(
    @InjectModel(PrimaryQuestion.name)
    private readonly primaryQuestionModel: Model<PrimaryQuestion>,
    @InjectModel(FirstQuestion.name)
    private readonly firstQuestionModel: Model<FirstQuestion>,
    @InjectModel(SecondQuestion.name)
    private readonly secondQuestionModel: Model<SecondQuestion>
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
    page: number = 1,
    limit: number = 10,
    comprehensiveTestIds: string[]
  ) {
    const skip = (page - 1) * limit;

    const primaryTestIds = await this.primaryQuestionModel
      .find({
        comprehensiveTestId: {
          $in: comprehensiveTestIds.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .skip(skip)
      .limit(limit)
      .select("_id")
      .populate("comprehensiveTestId");
    const totalPrimaryTests = await this.primaryQuestionModel.countDocuments({
      comprehensiveTestId: {
        $in: [comprehensiveTestIds],
      },
    });

    const primaryTests = await this.primaryQuestionModel.find({
      _id: {
        $in: primaryTestIds,
      },
    });
    if (primaryTests.length === 0) {
      return [];
    }

    const totalFirstQuestions = await this.firstQuestionModel.countDocuments({
      comprehensiveTestId: {
        $in: [comprehensiveTestIds],
      },
    });

    const totalSecondQuestions = await this.secondQuestionModel.countDocuments({
      comprehensiveTestId: {
        $in: [comprehensiveTestIds],
      },
    });

    return {
      primaryTests,
      currentPage: page,
      totalPages: Math.ceil(totalPrimaryTests / limit),
      totalItems: totalPrimaryTests,
      totalSimilarQuestions: totalFirstQuestions + totalSecondQuestions,
    };
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
