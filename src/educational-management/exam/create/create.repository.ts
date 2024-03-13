import {
  Body,
  HttpStatus,
  Injectable,
  Param,
  Req,
  Res,
  UploadedFiles,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateExam } from "./entities/create.entity";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { ImageService } from "../../../common/services/imageService";

@Injectable()
export class CreateExamRepository {
  constructor(
    @InjectModel(CreateExam.name)
    private readonly createExamModel: Model<CreateExam>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.createExamModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() createCreateExamDto: CreateCreateExamDto
  ) {
    try {
      if (AnswerSheetSourcePdfFile && AnswerSheetSourcePdfFile.length > 0) {
        let answersheetPdfPath: string[] = [];

        for (let i = 0; i < AnswerSheetSourcePdfFile.length; i++) {
          const file = AnswerSheetSourcePdfFile[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/create_exam",
            file
          );
          answersheetPdfPath.push(fileName);
        }

        createCreateExamDto.AnswerSheetSourcePdfFile = answersheetPdfPath;
      }

      const createCreateExamModel = await this.createExamModel.create(
        createCreateExamDto
      );

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

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const createExams = await this.createExamModel
      .find({})
      .skip(skip)
      .limit(limit);
    const totalCreateExams = await this.createExamModel.find({}).count();

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
  async findAllCreateExamsBasedOnStandardExam(
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    const createExams = await this.createExamModel
      .find({ type: "standard" })
      .populate(["books", "gradeLevel"])
      .skip(skip)
      .limit(limit);
    const totalCreateExams = await this.createExamModel
      .find({ type: "standard" })
      .populate(["books", "gradeLevel"])
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

  async findAllCreateExamsBasedOnSubjectiveExam(
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    const createExams = await this.createExamModel
      .find({ type: "subjective" })
      .skip(skip)
      .limit(limit);
    const totalCreateExams = await this.createExamModel
      .find({ type: "subjective" })
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
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    try {
      if (AnswerSheetSourcePdfFile && AnswerSheetSourcePdfFile.length > 0) {
        let answersheetPdfPath: string[] = [];

        for (let i = 0; i < AnswerSheetSourcePdfFile.length; i++) {
          const file = AnswerSheetSourcePdfFile[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/create_exam",
            file
          );
          answersheetPdfPath.push(fileName);
        }

        updateCreateExamDto.AnswerSheetSourcePdfFile = answersheetPdfPath;
      }

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
