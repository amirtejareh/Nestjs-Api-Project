import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { AnswersheetManagement } from "./entities/answersheet-management.entity";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";
import { CreateAnswersheetManagementDto } from "./dto/create-answersheet-management.dto";
import { UpdateAnswersheetManagementDto } from "./dto/update-answersheet-management.dto";

@Injectable()
export class AnswersheetManagementRepository {
  constructor(
    @InjectModel(AnswersheetManagement.name)
    private readonly answersheetManagementModel: Model<AnswersheetManagement>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.answersheetManagementModel.findOne({ title }).exec();
  }

  async findOneByObjectiveTestId(objectiveTestId: string) {
    return this.answersheetManagementModel
      .findOne({ objectiveTest: objectiveTestId })
      .exec();
  }

  async create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    createAnswersheetManagementDto: CreateAnswersheetManagementDto
  ) {
    try {
      if (
        await this.findOneByObjectiveTestId(
          createAnswersheetManagementDto.objectiveTest
        )
      ) {
        throw new ConflictException(
          "برای آزمون مورد نظر پیش از این پاسخنامه و بودجه بندی آپلود شده است"
        );
      }

      if (AnswerSheetSourcePdfFile && AnswerSheetSourcePdfFile.length > 0) {
        let answersheetPdfPath: string[] = [];

        for (let i = 0; i < AnswerSheetSourcePdfFile.length; i++) {
          const file = AnswerSheetSourcePdfFile[i];
          const fileName = await this.imageService.saveImage(
            "answersheet_management",
            file
          );
          answersheetPdfPath.push(fileName);
        }

        createAnswersheetManagementDto.AnswerSheetSourcePdfFile =
          answersheetPdfPath;
      }
      const createAnswersheetManagement =
        await this.answersheetManagementModel.create(
          createAnswersheetManagementDto
        );
      return res.status(200).json({
        statusCode: 200,
        message: "یک پاسخنامه با موفقیت ایجاد شد.",
        data: createAnswersheetManagement,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.answersheetManagementModel.find({});
  }

  findOne(id: string) {
    return this.answersheetManagementModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateAnswersheetManagementDto: UpdateAnswersheetManagementDto
  ) {
    try {
      const answersheetManagement =
        await this.answersheetManagementModel.findOne({
          _id: id,
        });

      if (!answersheetManagement) {
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
        updateAnswersheetManagementDto.AnswerSheetSourcePdfFile = pdfFilesPath;

        if (answersheetManagement.AnswerSheetSourcePdfFile.length > 0) {
          for (
            let i = 0;
            i < answersheetManagement.AnswerSheetSourcePdfFile.length;
            i++
          ) {
            const file = answersheetManagement.AnswerSheetSourcePdfFile[i];
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

      const updateAnswersheetManagementModel =
        await this.answersheetManagementModel.findByIdAndUpdate(
          id,
          updateAnswersheetManagementDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "درس نامه با موفقیت بروزرسانی شد.",
        data: updateAnswersheetManagementModel,
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
      const findAnswersheetManagement =
        await this.answersheetManagementModel.findOne({
          _id: id,
        });

      if (findAnswersheetManagement) {
        const deleteBook = await this.answersheetManagementModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "درس نامه مورد نظر پیدا نشد",
          });
        }

        if (
          findAnswersheetManagement &&
          findAnswersheetManagement.AnswerSheetSourcePdfFile.length > 0
        ) {
          if (findAnswersheetManagement.AnswerSheetSourcePdfFile.length > 0) {
            for (
              let i = 0;
              i < findAnswersheetManagement.AnswerSheetSourcePdfFile.length;
              i++
            ) {
              const file =
                findAnswersheetManagement.AnswerSheetSourcePdfFile[i];
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
