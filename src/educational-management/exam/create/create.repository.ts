import { Body, HttpStatus, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateExam } from "./entities/create.entity";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { UpdateCreateExamDto } from "./dto/update-create.dto";

@Injectable()
export class CreateExamRepository {
  constructor(
    @InjectModel(CreateExam.name)
    private readonly createExamModel: Model<CreateExam>
  ) {}

  async findOneByTitle(title: string) {
    return this.createExamModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() createCreateExamDto: CreateCreateExamDto) {
    try {
      const createCreateExamModel = await this.createExamModel.create(
        createCreateExamDto
      );

      console.log(createCreateExamDto, "createCreateExamDto");

      return res.status(200).json({
        statusCode: 200,
        message: "شناسنامه سوال با موفقیت ایجاد شد",
        data: createCreateExamModel,
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

    const createExams = await this.createExamModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .skip(skip)
      .limit(limit);
    const totalCreateExams = await this.createExamModel
      .find({
        objectiveTests: {
          $in: objectiveTests,
        },
      })
      .count();

    if (createExams.length == 0) {
      return [];
    }
    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateExamsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        books: books,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      books: {
        $in: [books],
      },
    });

    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate("books");

    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  findOne(@Param("id") id: string) {
    return this.createExamModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    try {
      const updateCreateExamModel = await this.createExamModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateCreateExamDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: " آزمون استاندارد یا موضوعی مورد نظر با موفقیت بروزرسانی شد",
        data: updateCreateExamModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          "مشکلی در بروزرسانی آزمون استاندارد یا موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSectionModel = await this.createExamModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون استاندارد یا موضوعی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون استاندارد یا موضوعی مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          "مشکلی در حذف آزمون استاندارد یا موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
