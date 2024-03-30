import { Body, HttpStatus, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subjective } from "./entities/subjective.entity";
import { CreateSubjectiveDto } from "./dto/create-subjective.dto";
import { UpdateSubjectiveDto } from "./dto/update-subjective.dto";

@Injectable()
export class SubjectiveRepository {
  constructor(
    @InjectModel(Subjective.name)
    private readonly subjectiveModel: Model<Subjective>
  ) {}

  async findOneByTitle(title: string) {
    return this.subjectiveModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() createSubjectiveDto: CreateSubjectiveDto) {
    try {
      const createSubjectiveModel = await this.subjectiveModel.create(
        createSubjectiveDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "شناسنامه سوال با موفقیت ایجاد شد",
        data: createSubjectiveModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const subjectives = await this.subjectiveModel
      .find({})
      .populate({
        path: "createExam",
        populate: [
          { path: "gradeLevel" },
          { path: "books" },
          { path: "chapter" },
          { path: "subject" },
          { path: "section" },
        ],
      })
      .skip(skip)
      .limit(limit);
    const totalSubjectives = await this.subjectiveModel.find({}).count();

    if (subjectives.length == 0) {
      return [];
    }
    return {
      subjectives,
      currentPage: page,
      totalPages: Math.ceil(totalSubjectives / limit),
      totalItems: totalSubjectives,
    };
  }

  async findSubjectivesBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    const skip = (page - 1) * limit;

    const subjectiveIds = await this.subjectiveModel
      .find({
        books: books,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalSubjectives = await this.subjectiveModel.countDocuments({
      books: {
        $in: [books],
      },
    });

    const subjectives = await this.subjectiveModel
      .find({
        _id: {
          $in: subjectiveIds,
        },
      })
      .populate("books");

    if (subjectives.length === 0) {
      return [];
    }

    return {
      subjectives,
      currentPage: page,
      totalPages: Math.ceil(totalSubjectives / limit),
      totalItems: totalSubjectives,
    };
  }

  findOne(@Param("id") id: string) {
    return this.subjectiveModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectiveDto: UpdateSubjectiveDto
  ) {
    try {
      const updateSubjectiveModel = await this.subjectiveModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateSubjectiveDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: " آزمون موضوعی مورد نظر با موفقیت بروزرسانی شد",
        data: updateSubjectiveModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی آزمون موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSectionModel = await this.subjectiveModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون موضوعی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون موضوعی مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف آزمون موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
