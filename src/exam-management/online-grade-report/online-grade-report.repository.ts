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

    let easyCount = 0;
    let averageCount = 0;
    let hardCount = 0;
    let correctCount = 0;
    let correctEasyCount = 0;
    let correctAverageCount = 0;
    let correctHardCount = 0;
    let incorrectCount = 0;
    let incorrectEasyCount = 0;
    let incorrectAverageCount = 0;
    let incorrectHardCount = 0;
    let unansweredCount = 0;
    let unansweredEasyCount = 0;
    let unansweredAverageCount = 0;
    let unansweredHardCount = 0;
    let conceptionalCount = 0;
    let correctConceptionalCount = 0;
    let incorrectConceptionalCount = 0;
    let unansweredConceptionalCount = 0;
    let computationalCount = 0;
    let correctComputationalCount = 0;
    let incorrectComputationalCount = 0;
    let unansweredComputationalCount = 0;
    let trickCount = 0;
    let correctTrickCount = 0;
    let incorrectTrickCount = 0;
    let unansweredTrickCount = 0;
    let memorizationalCount = 0;
    let correctMemorizationalCount = 0;
    let incorrectMemorizationalCount = 0;
    let unansweredMemorizationalCount = 0;
    let challengingCount = 0;
    let correctChallengingCount = 0;
    let incorrectChallengingCount = 0;
    let unansweredChallengingCount = 0;

    let userAnswers = [];
    questions.map((question) => {
      if (question.questionDifficulty == "hard") {
        hardCount++;
      }
      if (question.questionDifficulty == "average") {
        averageCount++;
      }
      if (question.questionDifficulty == "easy") {
        easyCount++;
      }
      if (question.type == "conceptional") {
        conceptionalCount++;
      }
      if (question.type == "computational") {
        computationalCount++;
      }
      if (question.type == "trick") {
        trickCount++;
      }
      if (question.type == "memorizational") {
        memorizationalCount++;
      }
      if (question.type == "challenging") {
        challengingCount++;
      }
    });

    createOnlineGradeReportDto.question.forEach((result) => {
      const question = questions.find((q) => q.id === result._id);

      const bookReferences = question.bookReferences;

      if (question) {
        if (result.value == question.correctAnswer) {
          correctCount++;
          if (question.questionDifficulty == "hard") {
            correctHardCount++;
          }
          if (question.questionDifficulty == "average") {
            correctAverageCount++;
          }
          if (question.questionDifficulty == "easy") {
            correctEasyCount++;
          }

          if (question.type == "conceptional") {
            correctConceptionalCount++;
          }
          if (question.type == "computational") {
            correctComputationalCount++;
          }
          if (question.type == "trick") {
            correctTrickCount++;
          }
          if (question.type == "memorizational") {
            correctMemorizationalCount++;
          }
          if (question.type == "challenging") {
            correctChallengingCount++;
          }

          if (
            userAnswers.find((item) => item.title == bookReferences[0].title)
          ) {
            userAnswers
              .find((item) => item.title == bookReferences[0].title)
              .children.push({
                number: question.number,
                answer: "صحیح",
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
          } else {
            userAnswers.push({
              title: bookReferences[0].title,
              children: [
                {
                  number: question.number,
                  answer: "صحیح",
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
                },
              ],
            });
          }
        } else if (result.value == "-") {
          if (
            userAnswers.find((item) => item.book == bookReferences[0].title)
          ) {
            userAnswers
              .find((item) => item.title == bookReferences[0].title)
              .children.push({
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
          } else {
            userAnswers.push({
              title: bookReferences[0].title,
              children: [
                {
                  number: question.number,
                  answer: "نزده",
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
                },
              ],
            });
          }
          unansweredCount++;
          if (question.questionDifficulty == "hard") {
            unansweredHardCount++;
          }
          if (question.questionDifficulty == "average") {
            unansweredAverageCount++;
          }
          if (question.questionDifficulty == "easy") {
            unansweredEasyCount++;
          }
          if (question.type == "conceptional") {
            unansweredConceptionalCount++;
          }
          if (question.type == "computational") {
            unansweredComputationalCount++;
          }
          if (question.type == "trick") {
            unansweredTrickCount++;
          }
          if (question.type == "memorizational") {
            unansweredMemorizationalCount++;
          }
          if (question.type == "challenging") {
            unansweredChallengingCount++;
          }
        } else {
          if (
            userAnswers.find((item) => item.title == bookReferences[0].title)
          ) {
            userAnswers
              .find((item) => item.title == bookReferences[0].title)
              .children.push({
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
          } else {
            userAnswers.push({
              title: bookReferences[0].title,
              children: [
                {
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
                },
              ],
            });
          }

          incorrectCount++;
          if (question.questionDifficulty == "hard") {
            incorrectHardCount++;
          }
          if (question.questionDifficulty == "average") {
            incorrectAverageCount++;
          }
          if (question.questionDifficulty == "easy") {
            incorrectEasyCount++;
          }

          if (question.type == "conceptional") {
            incorrectConceptionalCount++;
          }
          if (question.type == "computational") {
            incorrectComputationalCount++;
          }
          if (question.type == "trick") {
            incorrectTrickCount++;
          }
          if (question.type == "memorizational") {
            incorrectMemorizationalCount++;
          }
          if (question.type == "challenging") {
            incorrectChallengingCount++;
          }
        }
      } else {
        if (userAnswers.find((item) => item.title == bookReferences[0].title)) {
          userAnswers
            .find((item) => item.title == bookReferences[0].title)
            .children.push({
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
        } else {
          userAnswers.push({
            title: bookReferences[0].title,
            children: [
              {
                number: question.number,
                answer: "نزده",
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
              },
            ],
          });
        }

        unansweredCount++;
        if (question.questionDifficulty == "hard") {
          unansweredHardCount++;
        }
        if (question.questionDifficulty == "average") {
          unansweredAverageCount++;
        }
        if (question.questionDifficulty == "easy") {
          unansweredEasyCount++;
        }
        if (question.type == "conceptional") {
          unansweredConceptionalCount++;
        }
        if (question.type == "computational") {
          unansweredComputationalCount++;
        }
        if (question.type == "trick") {
          unansweredTrickCount++;
        }
        if (question.type == "memorizational") {
          unansweredMemorizationalCount++;
        }
        if (question.type == "challenging") {
          unansweredChallengingCount++;
        }
      }
    });

    const report = {
      user,
      objectiveTests: examId,
      userAnswers,
      examNumber,
      examType,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
      easyCount,
      averageCount,
      hardCount,
      correctEasyCount,
      correctAverageCount,
      correctHardCount,
      incorrectEasyCount,
      incorrectAverageCount,
      incorrectHardCount,
      unansweredEasyCount,
      unansweredAverageCount,
      unansweredHardCount,
      conceptionalCount,
      correctConceptionalCount,
      incorrectConceptionalCount,
      unansweredConceptionalCount,
      computationalCount,
      correctComputationalCount,
      incorrectComputationalCount,
      unansweredComputationalCount,
      trickCount,
      correctTrickCount,
      incorrectTrickCount,
      unansweredTrickCount,
      memorizationalCount,
      correctMemorizationalCount,
      incorrectMemorizationalCount,
      unansweredMemorizationalCount,
      challengingCount,
      correctChallengingCount,
      incorrectChallengingCount,
      unansweredChallengingCount,
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
