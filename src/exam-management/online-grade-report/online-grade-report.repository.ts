import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { OnlineGradeReport } from "./entities/online-grade-report.entity";
import { CreateOnlineGradeReportDto } from "./dto/create-online-grade-report.dto";
import { UpdateOnlineGradeReportDto } from "./dto/update-online-grade-report.dto";
import { QuestionController } from "../question/question.controller";
import { QuestionService } from "../question/question.service";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class OnlineGradeReportRepository {
  constructor(
    @InjectModel(OnlineGradeReport.name)
    private readonly onlineGradeReportModel: Model<OnlineGradeReport>,
    private readonly questionService: QuestionService
  ) {}

  async findOneByExamNumber(objectiveTestId: string, user: User) {
    const report = await this.onlineGradeReportModel
      .findOne({
        $and: [
          { objectiveTests: { $in: objectiveTestId } },
          { "user.username": user.username },
        ],
      })
      .exec();

    return report;
  }

  async create(
    @Res() res,
    @Body() createOnlineGradeReportDto: CreateOnlineGradeReportDto
  ) {
    const user = createOnlineGradeReportDto.user.user;
    const examId = createOnlineGradeReportDto.examId;

    if (await this.findOneByExamNumber(examId, user)) {
      throw new ConflictException(
        "امکان ثبت مجدد نتیجه آزمون وجود ندارد میتوانید در میز کار خود نتیجه آزمون فعلی را مشاهده کنید."
      );
    }
    const examNumber = createOnlineGradeReportDto.examNumber;
    const examType = createOnlineGradeReportDto.type;
    const questions =
      await this.questionService.findQuestionsBasedOnObjectiveTests(examId);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let userAnswers = [];

    createOnlineGradeReportDto.question.forEach((result) => {
      const question = questions.find((q) => q.id === result._id);

      if (question) {
        if (result.value === question.correctAnswer) {
          correctCount++;
          userAnswers.push({
            number: question.number,
            answerResult: "صحیح",
            userAnswer: result.value,
            correctAnswer: question.correctAnswer,
            gradeLevels: question.gradeLevels.map((gradeLevel) => {
              return {
                title: gradeLevel.title,
              };
            }),
            chapters: question.chapters.map((chapter) => {
              return {
                title: chapter.title,
              };
            }),
            subjects: question.subjects.map((subject) => {
              return {
                title: subject.title,
              };
            }),
            questionType: question.type,
            questionDifficulty: question.questionDifficulty,
          });
        } else if (result.value === "-") {
          userAnswers.push({
            number: question.number,
            answer: "نزده",
            userAnswer: result.value ?? "-",
            correctAnswer: question.correctAnswer,
            gradeLevels: question.gradeLevels.map((gradeLevel) => {
              return {
                title: gradeLevel.title,
              };
            }),
            chapters: question.chapters.map((chapter) => {
              return {
                title: chapter.title,
              };
            }),
            subjects: question.subjects.map((subject) => {
              return {
                title: subject.title,
              };
            }),
            questionType: question.type,
            questionDifficulty: question.questionDifficulty,
          });
          unansweredCount++;
        } else {
          userAnswers.push({
            number: question.number,
            answer: "غلط",
            userAnswer: result.value,
            correctAnswer: question.correctAnswer,
            gradeLevels: question.gradeLevels.map((gradeLevel) => {
              return {
                title: gradeLevel.title,
              };
            }),
            chapters: question.chapters.map((chapter) => {
              return {
                title: chapter.title,
              };
            }),
            subjects: question.subjects.map((subject) => {
              return {
                title: subject.title,
              };
            }),
            questionType: question.type,
            questionDifficulty: question.questionDifficulty,
          });
          incorrectCount++;
        }
      } else {
        userAnswers.push({
          number: question.number,
          answer: "نزده",
          userAnswer: result.value ?? "-",
          correctAnswer: question.correctAnswer,
          gradeLevels: question.gradeLevels.map((gradeLevel) => {
            return {
              title: gradeLevel.title,
            };
          }),
          chapters: question.chapters.map((chapter) => {
            return {
              title: chapter.title,
            };
          }),
          subjects: question.subjects.map((subject) => {
            return {
              title: subject.title,
            };
          }),
          questionType: question.type,
          questionDifficulty: question.questionDifficulty,
        });
        unansweredCount++;
      }
    });

    const report = {
      user,
      objectiveTests: examId,
      userAnswers,
      examNumber,
      examType,
      totalQuestions: questions.length,
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      unansweredCount: unansweredCount,
      gradeLevel: createOnlineGradeReportDto.gradeLevel,
    };

    try {
      const createOnlineGradeReportModel =
        await this.onlineGradeReportModel.create(report);
      return res.status(200).json({
        statusCode: 200,
        message: "کارنامه شما با موفقیت صادر شد",
        data: createOnlineGradeReportModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.onlineGradeReportModel.find({});
  }

  findOne(@Param("id") id: string) {
    return this.onlineGradeReportModel.findOne({ _id: id });
  }

  getObjectiveTestsBasedNumber(
    @Param("objectiveTestId") objectiveTests: string
  ) {
    return this.onlineGradeReportModel
      .find({
        objectiveTests,
      })
      .populate("gradeLevel");
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateOnlineGradeReportDto: UpdateOnlineGradeReportDto
  ) {
    try {
      const updateSectionModel =
        await this.onlineGradeReportModel.findOneAndUpdate(
          { _id: id },
          { $set: { ...updateOnlineGradeReportDto } },
          { new: true }
        );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "گزارش کارنامه مورد نظر با موفقیت بروزرسانی شد",
        data: updateSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی گزارش کارنامه مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const findOneObjectiveTest = await this.findOne(id);
      if (!findOneObjectiveTest) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون تستی مورد نظر پیدا نشد",
        });
      }

      const deleteOnlineGradeReportModel =
        await this.onlineGradeReportModel.deleteOne({
          _id: id,
        });
      if (!deleteOnlineGradeReportModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "کارنامه مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "گزارش کارنامه مورد نظر با موفقیت حذف شد",
        data: deleteOnlineGradeReportModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف گزارش کارنامه مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
