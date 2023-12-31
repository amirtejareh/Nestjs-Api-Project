import { Body, HttpStatus, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Question, QuestionDocument } from "./entities/question.entity";
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

  async findAll(page: number = 1, limit: number = 10, objectiveTests: string) {
    const skip = (page - 1) * limit;

    const questions = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .skip(skip)
      .limit(limit);
    const totalQuestions = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .count();

    if (questions.length == 0) {
      return [];
    }
    return {
      questions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalItems: totalQuestions,
    };
  }

  async findQuestionsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    const skip = (page - 1) * limit;

    const questionIds = await this.questionModel
      .find({
        books: books,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalQuestions = await this.questionModel.countDocuments({
      books: {
        $in: [books],
      },
    });

    const questions = await this.questionModel
      .find({
        _id: {
          $in: questionIds,
        },
      })
      .populate("books");

    if (questions.length === 0) {
      return [];
    }

    return {
      questions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalItems: totalQuestions,
    };
  }

  async findQuestionsBasedOnBookReferences(
    page: number = 1,
    limit: number = 10,
    bookReferences: string
  ) {
    const skip = (page - 1) * limit;

    const questionIds = await this.questionModel
      .find({
        bookReferences: bookReferences,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalQuestions = await this.questionModel.countDocuments({
      bookReferences: {
        $in: [bookReferences],
      },
    });

    const questions = await this.questionModel
      .find({
        _id: {
          $in: questionIds,
        },
      })
      .populate("books");

    if (questions.length === 0) {
      return [];
    }

    return {
      questions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalItems: totalQuestions,
    };
  }

  async findBooksBasedOnObjectiveTests(objectiveTests: string) {
    const questions = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .populate("books");

    const uniqueBooks = [];

    questions.forEach((question) => {
      const book = question.books[0];
      const existingBook = uniqueBooks.find((b) => b.title === book.title);
      if (!existingBook) {
        uniqueBooks.push({
          title: book.title,
          _id: book._id,
        });
      }
    });

    return uniqueBooks;
  }

  async findBookReferencesBasedOnObjectiveTests(objectiveTests: string) {
    const questions = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .populate("bookReferences");

    const uniqueBookReferences = [];

    questions.forEach((question) => {
      const bookReferences = question.bookReferences[0];
      const existingBook = uniqueBookReferences.find(
        (b) => b.title === bookReferences.title
      );
      if (!existingBook) {
        uniqueBookReferences.push({
          title: bookReferences.title,
          _id: bookReferences._id,
        });
      }
    });

    return uniqueBookReferences;
  }

  async findQuestionsBasedOnObjectiveTests(objectiveTests: string) {
    const questions = await this.questionModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .populate(["gradeLevels", "chapters", "subjects", "bookReferences"]);

    return questions;
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
          message: "سوال مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "سوال مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف سوال مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
