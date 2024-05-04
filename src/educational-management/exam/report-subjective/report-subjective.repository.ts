import { ConflictException, Injectable, Res } from "@nestjs/common";
import { CreateReportSubjectiveDto } from "./dto/create-report-subjective.dto";
import { UpdateReportSubjectiveDto } from "./dto/update-report-subjective.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReportSubjective } from "./entities/report-subjective.entity";
import { SubjectiveService } from "../subjective/subjective.service";

@Injectable()
export class ReportSubjectiveRepository {
  constructor(
    @InjectModel(ReportSubjective.name)
    private readonly reportSubjectiveModel: Model<ReportSubjective>,
    private readonly subjectiveExamModel: SubjectiveService
  ) {}
  async create(
    @Res() res,
    createReportSubjectiveDto: CreateReportSubjectiveDto
  ) {
    const reportFound = await this.reportSubjectiveModel
      .findOne({
        $and: [
          { examId: createReportSubjectiveDto.examId },
          { "user.username": createReportSubjectiveDto.user.username },
        ],
      })
      .exec();

    if (reportFound) {
      throw new ConflictException(
        "امکان ثبت مجدد نتیجه آزمون وجود ندارد میتوانید در میز کار خود نتیجه آزمون فعلی را مشاهده کنید."
      );
    }

    const questions = await this.findAllQuestionsInSubjectiveExamBasedOnExamId(
      createReportSubjectiveDto.examId
    );

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    let userAnswers = [];

    questions.forEach((result) => {
      const question = createReportSubjectiveDto.question.find(
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
      user: createReportSubjectiveDto.user,
      userAnswers,
      examId: createReportSubjectiveDto.examId,
      examType: createReportSubjectiveDto.type,
      book: createReportSubjectiveDto.book,
      gradeLevel: createReportSubjectiveDto.gradeLevel,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
    };

    try {
      const createOnlineGradeReportModel =
        await this.reportSubjectiveModel.create(report);
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

  async findAllQuestionsInSubjectiveExamBasedOnExamId(examId: string) {
    return await this.subjectiveExamModel.findAllQuestionsInSubjectiveExamBasedOnExamId(
      examId
    );
  }
  async findSubjectiveReportBasedOnExamId(
    res,
    examId: string,
    username: string
  ) {
    try {
      const examFound = await this.reportSubjectiveModel
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
    return `This action returns all reportSubjective`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportSubjective`;
  }

  update(id: number, updateReportSubjectiveDto: UpdateReportSubjectiveDto) {
    return `This action updates a #${id} reportSubjective`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportSubjective`;
  }
}
