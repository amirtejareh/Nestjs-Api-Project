import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { CreateEssayQuestionsDto } from "./dto/create-essay-questions.dto";
import { UpdateEssayQuestionDto } from "./dto/update-essay-questions.dto";
import { InjectModel } from "@nestjs/mongoose";
import { EssayQuestion } from "./entities/essay-questions.entity";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";

@Injectable()
export class EssayQuestionRepository {
  constructor(
    @InjectModel(EssayQuestion.name)
    private readonly essayQuestionModel: Model<EssayQuestion>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.essayQuestionModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createEssayQuestionDto: CreateEssayQuestionsDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/essay_question",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createEssayQuestionDto.pdfFiles = pdfFilesPath;
      }
      const createLearningMaterial = await this.essayQuestionModel.create(
        createEssayQuestionDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک سوال تشریحی با موفقیت ایجاد شد.",
        data: createLearningMaterial,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.essayQuestionModel.find({});
  }

  findOne(id: string) {
    return this.essayQuestionModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const essayQuestion = await this.essayQuestionModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return essayQuestion;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateEssayQuestionDto: UpdateEssayQuestionDto
  ) {
    try {
      const essayQuestion = await this.essayQuestionModel.findOne({ _id: id });

      if (!essayQuestion) {
        throw new NotFoundException("سوال تشریحی مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/essay_question",
            file
          );
          pdfFilesPath.push(fileName);
        }
        updateEssayQuestionDto.pdfFiles = pdfFilesPath;

        if (essayQuestion.pdfFiles.length > 0) {
          for (let i = 0; i < essayQuestion.pdfFiles.length; i++) {
            const file = essayQuestion.pdfFiles[i];
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

      const updateLearningMaterialModel =
        await this.essayQuestionModel.findByIdAndUpdate(
          id,
          updateEssayQuestionDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "سوال تشریحی با موفقیت بروزرسانی شد.",
        data: updateLearningMaterialModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findBasedOnBooks(books: string[]) {
    const essayQuestions = await this.essayQuestionModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter", "section", "subject"]);

    return essayQuestions;
  }

  async remove(@Res() res, id: string) {
    try {
      const findLearningMaterial = await this.essayQuestionModel.findOne({
        _id: id,
      });

      if (findLearningMaterial) {
        const deleteEssayQuestion = await this.essayQuestionModel.deleteOne({
          _id: id,
        });
        if (!deleteEssayQuestion) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "سوال تشریحی مورد نظر پیدا نشد",
          });
        }

        if (findLearningMaterial && findLearningMaterial.pdfFiles.length > 0) {
          if (findLearningMaterial.pdfFiles.length > 0) {
            for (let i = 0; i < findLearningMaterial.pdfFiles.length; i++) {
              const file = findLearningMaterial.pdfFiles[i];
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
          message: "سوال تشریحی مورد نظر با موفقیت حذف شد",
          data: deleteEssayQuestion,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "سوال تشریحی مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف سوال تشریحی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
