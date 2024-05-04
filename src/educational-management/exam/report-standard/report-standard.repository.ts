import { ConflictException, Injectable, Res } from "@nestjs/common";
import { CreateReportStandardDto } from "./dto/create-report-standard.dto";
import { UpdateReportStandardDto } from "./dto/update-report-standard.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReportStandard } from "./entities/report-standard.entity";
import { StandardService } from "../standard/standard.service";

@Injectable()
export class ReportStandardRepository {
  constructor(
    @InjectModel(ReportStandard.name)
    private readonly reportStandardModel: Model<ReportStandard>,
    private readonly standardExamModel: StandardService
  ) {}
  async create(@Res() res, createReportStandardDto: CreateReportStandardDto) {
    const reportFound = await this.reportStandardModel
      .findOne({
        $and: [
          { examId: createReportStandardDto.examId },
          { "user.username": createReportStandardDto.user.username },
        ],
      })
      .exec();

    if (reportFound) {
      throw new ConflictException(
        "امکان ثبت مجدد نتیجه آزمون وجود ندارد میتوانید در میز کار خود نتیجه آزمون فعلی را مشاهده کنید."
      );
    }

    const questions = await this.findAllQuestionsInStandardExamBasedOnExamId(
      createReportStandardDto.examId
    );

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    let userAnswers = [];

    questions.forEach((result) => {
      const question = createReportStandardDto.question.find(
        (q: any) => q.id == result._id
      );

      if (question) {
        if (Number(question.value) == result.correctAnswer) {
          correctCount++;

          if (userAnswers.find((item) => item.title == "کل")) {
            userAnswers
              .find((item) => item.title == "کل")
              .children.push({
                number: result.number,
                answer: "صحیح",
                userAnswer: question.value,
                correctAnswer: result.correctAnswer,
              });
          } else {
            userAnswers.push({
              title: "کل",
              children: [
                {
                  number: result.number,
                  answer: "صحیح",
                  userAnswer: question.value,
                  correctAnswer: result.correctAnswer,
                },
              ],
            });
          }
        }
        if (question.value == "-") {
          unansweredCount++;

          if (userAnswers.find((item) => item.title == "کل")) {
            userAnswers
              .find((item) => item.title == "کل")
              .children.push({
                number: result.number,
                answer: "نزده",
                userAnswer: question.value,
                correctAnswer: result.correctAnswer,
              });
          } else {
            userAnswers.push({
              title: "کل",
              children: [
                {
                  number: result.number,
                  answer: "نزده",
                  userAnswer: question.value,
                  correctAnswer: result.correctAnswer,
                },
              ],
            });
          }
        }
        if (
          question.value != "-" &&
          Number(question.value) != result.correctAnswer
        ) {
          incorrectCount++;

          if (userAnswers.find((item) => item.title == "کل")) {
            userAnswers
              .find((item) => item.title == "کل")
              .children.push({
                number: result.number,
                answer: "غلط",
                userAnswer: question.value,
                correctAnswer: result.correctAnswer,
              });
          } else {
            userAnswers.push({
              title: "کل",
              children: [
                {
                  number: result.number,
                  answer: "غلط",
                  userAnswer: question.value,
                  correctAnswer: result.correctAnswer,
                },
              ],
            });
          }
        }
      } else {
        unansweredCount++;
      }
    });

    const report = {
      user: createReportStandardDto.user,
      userAnswers,
      examId: createReportStandardDto.examId,
      examNumber: createReportStandardDto.examNumber,
      examType: createReportStandardDto.type,
      book: createReportStandardDto.book,
      gradeLevel: createReportStandardDto.gradeLevel,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
    };

    try {
      const createOnlineGradeReportModel =
        await this.reportStandardModel.create(report);
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

  async findAllQuestionsInStandardExamBasedOnExamId(examId: string) {
    return await this.standardExamModel.findAllQuestionsInStandardExamBasedOnExamId(
      examId
    );
  }
  async findStandardReportBasedOnExamId(res, examId: string, username: string) {
    try {
      const examFound = await this.reportStandardModel
        .findOne({
          $and: [{ examId }, { "user.username": username }],
        })
        .populate("book")
        .exec();

      if (examFound) {
        return res.status(200).json({
          statusCode: 200,
          message: "یک آزمون یافت شد",
          data: examFound,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          message: "آزمونی یافت نشد",
        });
      }
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return `This action returns all reportStandard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportStandard`;
  }

  update(id: number, updateReportStandardDto: UpdateReportStandardDto) {
    return `This action updates a #${id} reportStandard`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportStandard`;
  }
}
