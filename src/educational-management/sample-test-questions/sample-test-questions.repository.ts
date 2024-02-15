import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { ImageService } from "../../common/services/imageService";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { existsSync } from "fs";
import * as fs from "fs";
import { SampleTestQuestions } from "./entities/sample-test-question.entity";
import { CreateSampleTestQuestionsDto } from "./dto/create-sample-test-question.dto";
import { UpdateSampleTestQuestionsDto } from "./dto/update-sample-test-question.dto";

@Injectable()
export class SampleTestQuestionsRepository {
  constructor(
    @InjectModel(SampleTestQuestions.name)
    private readonly sampleExampleQuestionsModel: Model<SampleTestQuestions>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.sampleExampleQuestionsModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createSampleTestQuestionsDto: CreateSampleTestQuestionsDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "sample-test-questions",
            file
          );
          pdfFilesPath.push(fileName);
        }
        createSampleTestQuestionsDto.pdfFiles = pdfFilesPath;
      }
      const createSampleTestQuestions =
        await this.sampleExampleQuestionsModel.create(
          createSampleTestQuestionsDto
        );
      return res.status(200).json({
        statusCode: 200,
        message: "یک نمونه سوال امتحانی با موفقیت ایجاد شد.",
        data: createSampleTestQuestions,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.sampleExampleQuestionsModel.find({});
  }

  findOne(id: string) {
    return this.sampleExampleQuestionsModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const sampleExampleQuestionss = await this.sampleExampleQuestionsModel.find(
      {
        subject: {
          $in: subjects.map((id: string) => new Types.ObjectId(id)),
        },
      }
    );

    return sampleExampleQuestionss;
  }

  async findBasedOnBooks(books: string[]) {
    const sampleExampleQuestionss = await this.sampleExampleQuestionsModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter", "section", "subject"]);

    return sampleExampleQuestionss;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateSampleTestQuestionsDto: UpdateSampleTestQuestionsDto
  ) {
    try {
      const sampleExampleQuestions =
        await this.sampleExampleQuestionsModel.findOne({
          _id: id,
        });

      if (!sampleExampleQuestions) {
        throw new NotFoundException("نمونه سوال امتحانی مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "sample-example-question",
            file
          );
          pdfFilesPath.push(fileName);
        }
        updateSampleTestQuestionsDto.pdfFiles = pdfFilesPath;

        if (sampleExampleQuestions.pdfFiles.length > 0) {
          for (let i = 0; i < sampleExampleQuestions.pdfFiles.length; i++) {
            const file = sampleExampleQuestions.pdfFiles[i];
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
              } catch (err) {
                throw new InternalServerErrorException(
                  "خطایی در حذف فایل قدیمی رخ داده است."
                );
              }
            }
          }
        }
      }

      const updateSampleTestQuestionsModel =
        await this.sampleExampleQuestionsModel.findByIdAndUpdate(
          id,
          updateSampleTestQuestionsDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "نمونه سوال امتحانی با موفقیت بروزرسانی شد.",
        data: updateSampleTestQuestionsModel,
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
      const findSampleTestQuestions =
        await this.sampleExampleQuestionsModel.findOne({
          _id: id,
        });

      if (findSampleTestQuestions) {
        const deleteBook = await this.sampleExampleQuestionsModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "نمونه سوال امتحانی مورد نظر پیدا نشد",
          });
        }

        if (
          findSampleTestQuestions &&
          findSampleTestQuestions.pdfFiles.length > 0
        ) {
          if (findSampleTestQuestions.pdfFiles.length > 0) {
            for (let i = 0; i < findSampleTestQuestions.pdfFiles.length; i++) {
              const file = findSampleTestQuestions.pdfFiles[i];
              if (existsSync(file)) {
                try {
                  fs.unlinkSync(`${file}`);
                } catch (err) {
                  throw new InternalServerErrorException(
                    "خطایی در حذف فایل رخ داده است."
                  );
                }
              }
            }
          }
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "نمونه سوال امتحانی مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "نمونه سوال امتحانی مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف نمونه سوال امتحانی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
