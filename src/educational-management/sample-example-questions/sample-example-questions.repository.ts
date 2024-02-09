import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { CreateSampleExampleQuestionsDto } from "./dto/create-sample-example-question.dto";
import { UpdateSampleExampleQuestionsDto } from "./dto/update-sample-example-question.dto";
import { SampleExampleQuestions } from "./entities/sample-example-question.entity";
import { ImageService } from "../../common/services/imageService";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { existsSync } from "fs";
import * as fs from "fs";

@Injectable()
export class SampleExampleQuestionsRepository {
  constructor(
    @InjectModel(SampleExampleQuestions.name)
    private readonly learningMaterialModel: Model<SampleExampleQuestions>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.learningMaterialModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createSampleExampleQuestionsDto: CreateSampleExampleQuestionsDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "learning_material",
            file
          );
          pdfFilesPath.push(fileName);
        }
        createSampleExampleQuestionsDto.pdfFiles = pdfFilesPath;
      }
      const createSampleExampleQuestions =
        await this.learningMaterialModel.create(
          createSampleExampleQuestionsDto
        );
      return res.status(200).json({
        statusCode: 200,
        message: "یک درس نامه با موفقیت ایجاد شد.",
        data: createSampleExampleQuestions,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.learningMaterialModel.find({});
  }

  findOne(id: string) {
    return this.learningMaterialModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const learningMaterials = await this.learningMaterialModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return learningMaterials;
  }

  async findBasedOnBooks(books: string[]) {
    const learningMaterials = await this.learningMaterialModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter", "section", "subject"]);

    return learningMaterials;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateSampleExampleQuestionsDto: UpdateSampleExampleQuestionsDto
  ) {
    try {
      const learningMaterial = await this.learningMaterialModel.findOne({
        _id: id,
      });

      if (!learningMaterial) {
        throw new NotFoundException("درس نامه مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "learning_material",
            file
          );
          pdfFilesPath.push(fileName);
        }
        updateSampleExampleQuestionsDto.pdfFiles = pdfFilesPath;

        if (learningMaterial.pdfFiles.length > 0) {
          for (let i = 0; i < learningMaterial.pdfFiles.length; i++) {
            const file = learningMaterial.pdfFiles[i];
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

      const updateSampleExampleQuestionsModel =
        await this.learningMaterialModel.findByIdAndUpdate(
          id,
          updateSampleExampleQuestionsDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "درس نامه با موفقیت بروزرسانی شد.",
        data: updateSampleExampleQuestionsModel,
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
      const findSampleExampleQuestions =
        await this.learningMaterialModel.findOne({
          _id: id,
        });

      if (findSampleExampleQuestions) {
        const deleteBook = await this.learningMaterialModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "درس نامه مورد نظر پیدا نشد",
          });
        }

        if (
          findSampleExampleQuestions &&
          findSampleExampleQuestions.pdfFiles.length > 0
        ) {
          if (findSampleExampleQuestions.pdfFiles.length > 0) {
            for (
              let i = 0;
              i < findSampleExampleQuestions.pdfFiles.length;
              i++
            ) {
              const file = findSampleExampleQuestions.pdfFiles[i];
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
          message: "درس نامه مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "درس نامه مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف درس نامه مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
