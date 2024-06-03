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
    private readonly sampleExampleQuestionsModel: Model<SampleExampleQuestions>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.sampleExampleQuestionsModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createSampleExampleQuestionsDto: CreateSampleExampleQuestionsDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/sample-example-question",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createSampleExampleQuestionsDto.pdfFiles = pdfFilesPath;
      }
      const createSampleExampleQuestions =
        await this.sampleExampleQuestionsModel.create(
          createSampleExampleQuestionsDto
        );
      return res.status(200).json({
        statusCode: 200,
        message: "یک تمرین با موفقیت ایجاد شد.",
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
    updateSampleExampleQuestionsDto: UpdateSampleExampleQuestionsDto
  ) {
    try {
      const sampleExampleQuestions =
        await this.sampleExampleQuestionsModel.findOne({
          _id: id,
        });

      if (!sampleExampleQuestions) {
        throw new NotFoundException("تمرین مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/sample-example-question",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }

        updateSampleExampleQuestionsDto.pdfFiles = pdfFilesPath;

        if (sampleExampleQuestions.pdfFiles.length > 0) {
          for (let i = 0; i < sampleExampleQuestions.pdfFiles.length; i++) {
            const file = sampleExampleQuestions.pdfFiles[i].link;
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

        const updateSampleExampleQuestionsModel =
          await this.sampleExampleQuestionsModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateSampleExampleQuestionsDto.book,
                gradeLevel: updateSampleExampleQuestionsDto.gradeLevel,
                section: updateSampleExampleQuestionsDto.section,
                chapter: updateSampleExampleQuestionsDto.chapter,
                subject: updateSampleExampleQuestionsDto.subject,
                videos: updateSampleExampleQuestionsDto.videos,
              },
              $push: {
                pdfFiles: { $each: updateSampleExampleQuestionsDto.pdfFiles },
              },
            },
            {
              new: true,
            }
          );

        return res.status(200).json({
          statusCode: 200,
          message: "سوالات تشریحی با موفقیت بروزرسانی شد.",
          data: updateSampleExampleQuestionsModel,
        });
      }

      if (pdfFiles && pdfFiles.length == 0) {
        if (updateSampleExampleQuestionsDto?.pdfFiles?.length > 0) {
          let arrayConversion = updateSampleExampleQuestionsDto.pdfFiles.map(
            (element: any) => {
              return { name: JSON.parse(element).name };
            }
          );
          if (sampleExampleQuestions.pdfFiles.length > 0) {
            for (let i = 0; i < sampleExampleQuestions.pdfFiles.length; i++) {
              const file = sampleExampleQuestions.pdfFiles[i].link;

              let findIndex = arrayConversion.findIndex((element) => {
                return element.name == file.split("/")[3];
              });

              if (findIndex == -1) {
                if (existsSync(file)) {
                  try {
                    fs.unlinkSync(`${file}`);
                    await this.sampleExampleQuestionsModel.findByIdAndUpdate(
                      id,

                      {
                        $set: {
                          book: updateSampleExampleQuestionsDto.book,
                          gradeLevel:
                            updateSampleExampleQuestionsDto.gradeLevel,
                          section: updateSampleExampleQuestionsDto.section,
                          chapter: updateSampleExampleQuestionsDto.chapter,
                          subject: updateSampleExampleQuestionsDto.subject,
                          videos: updateSampleExampleQuestionsDto.videos,
                        },
                        $pull: { pdfFiles: sampleExampleQuestions.pdfFiles[i] },
                      },
                      { new: true }
                    );
                  } catch (err) {
                    throw new InternalServerErrorException(
                      "خطایی در حذف فایل قدیمی رخ داده است."
                    );
                  }
                }
              } else {
              }
            }
          }

          await this.sampleExampleQuestionsModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateSampleExampleQuestionsDto.book,
                gradeLevel: updateSampleExampleQuestionsDto.gradeLevel,
                section: updateSampleExampleQuestionsDto.section,
                chapter: updateSampleExampleQuestionsDto.chapter,
                subject: updateSampleExampleQuestionsDto.subject,
                videos: updateSampleExampleQuestionsDto.videos,
              },
            },
            {
              new: true,
            }
          );
        } else {
          for (let i = 0; i < sampleExampleQuestions.pdfFiles.length; i++) {
            const file = sampleExampleQuestions.pdfFiles[i].link;
            await this.sampleExampleQuestionsModel.findByIdAndUpdate(
              id,
              {
                $set: {
                  book: updateSampleExampleQuestionsDto.book,
                  gradeLevel: updateSampleExampleQuestionsDto.gradeLevel,
                  section: updateSampleExampleQuestionsDto.section,
                  chapter: updateSampleExampleQuestionsDto.chapter,
                  subject: updateSampleExampleQuestionsDto.subject,
                  videos: updateSampleExampleQuestionsDto.videos,
                },
                $pull: { pdfFiles: sampleExampleQuestions.pdfFiles[i] },
              },
              { new: true }
            );
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
                await this.sampleExampleQuestionsModel.findByIdAndUpdate(
                  id,
                  { $pull: { pdfFiles: sampleExampleQuestions.pdfFiles[i] } },
                  { new: true }
                );
              } catch (err) {
                throw new InternalServerErrorException(
                  "خطایی در حذف فایل قدیمی رخ داده است."
                );
              }
            }
          }
        }

        return res.status(200).json({
          statusCode: 200,
          message: "سوالات تشریحی با موفقیت بروزرسانی شد.",
        });
      }
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
        await this.sampleExampleQuestionsModel.findOne({
          _id: id,
        });

      if (findSampleExampleQuestions) {
        const deleteBook = await this.sampleExampleQuestionsModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "تمرین مورد نظر پیدا نشد",
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
              const file = findSampleExampleQuestions.pdfFiles[i].link;
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
          message: "تمرین مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "تمرین مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف تمرین مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
