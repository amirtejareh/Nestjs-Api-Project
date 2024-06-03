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
import { CreateLearningMaterialDto } from "./dto/create-learning-material.dto";
import { UpdateLearningMaterialDto } from "./dto/update-learning-material.dto";
import { InjectModel } from "@nestjs/mongoose";
import { LearningMaterial } from "./entities/learning-material.entity";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";

@Injectable()
export class LearningMaterialRepository {
  constructor(
    @InjectModel(LearningMaterial.name)
    private readonly learningMaterialModel: Model<LearningMaterial>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.learningMaterialModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createLearningMaterialDto: CreateLearningMaterialDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/learning_material",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createLearningMaterialDto.pdfFiles = pdfFilesPath;
      }
      const createLearningMaterial = await this.learningMaterialModel.create(
        createLearningMaterialDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک درس نامه با موفقیت ایجاد شد.",
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
      .populate([
        "book",
        "chapter",
        "section",
        {
          path: "subject",
          populate: [
            {
              path: "gradeLevels",
              model: "GradeLevel",
            },
            {
              path: "books",
              model: "Book",
            },
            {
              path: "chapters",
              model: "Chapter",
            },
            {
              path: "sections",
              model: "Section",
            },
          ],
        },
      ]);

    return learningMaterials;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateLearningMaterialDto: UpdateLearningMaterialDto
  ) {
    try {
      const learningMaterial = await this.learningMaterialModel.findOne({
        _id: id,
      });

      if (!learningMaterial) {
        throw new NotFoundException("درس نامه مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/learning_material",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }

        updateLearningMaterialDto.pdfFiles = pdfFilesPath;

        if (learningMaterial.pdfFiles.length > 0) {
          for (let i = 0; i < learningMaterial.pdfFiles.length; i++) {
            const file = learningMaterial.pdfFiles[i].link;
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

        const updateLearningMaterialModel =
          await this.learningMaterialModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateLearningMaterialDto.book,
                gradeLevel: updateLearningMaterialDto.gradeLevel,
                chapter: updateLearningMaterialDto.chapter,
                section: updateLearningMaterialDto.section,
                subject: updateLearningMaterialDto.subject,
                videos: updateLearningMaterialDto.videos,
              },
              $push: {
                pdfFiles: { $each: updateLearningMaterialDto.pdfFiles },
              },
            },
            {
              new: true,
            }
          );

        return res.status(200).json({
          statusCode: 200,
          message: "درس نامه با موفقیت بروزرسانی شد.",
          data: updateLearningMaterialModel,
        });
      }

      if (pdfFiles && pdfFiles.length == 0) {
        if (updateLearningMaterialDto?.pdfFiles?.length > 0) {
          let arrayConversion = updateLearningMaterialDto.pdfFiles.map(
            (element: any) => {
              return { name: JSON.parse(element).name };
            }
          );
          if (learningMaterial.pdfFiles.length > 0) {
            for (let i = 0; i < learningMaterial.pdfFiles.length; i++) {
              const file = learningMaterial.pdfFiles[i].link;

              let findIndex = arrayConversion.findIndex((element) => {
                return element.name == file.split("/")[3];
              });

              if (findIndex == -1) {
                if (existsSync(file)) {
                  try {
                    fs.unlinkSync(`${file}`);
                    await this.learningMaterialModel.findByIdAndUpdate(
                      id,

                      {
                        $set: {
                          book: updateLearningMaterialDto.book,
                          gradeLevel: updateLearningMaterialDto.gradeLevel,
                          chapter: updateLearningMaterialDto.chapter,
                          section: updateLearningMaterialDto.section,
                          subject: updateLearningMaterialDto.subject,
                          videos: updateLearningMaterialDto.videos,
                        },
                        $pull: { pdfFiles: learningMaterial.pdfFiles[i] },
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

          await this.learningMaterialModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateLearningMaterialDto.book,
                gradeLevel: updateLearningMaterialDto.gradeLevel,
                chapter: updateLearningMaterialDto.chapter,
                section: updateLearningMaterialDto.section,
                subject: updateLearningMaterialDto.subject,
                videos: updateLearningMaterialDto.videos,
              },
            },
            {
              new: true,
            }
          );
        } else {
          for (let i = 0; i < learningMaterial.pdfFiles.length; i++) {
            const file = learningMaterial.pdfFiles[i].link;
            await this.learningMaterialModel.findByIdAndUpdate(
              id,
              {
                $set: {
                  book: updateLearningMaterialDto.book,
                  gradeLevel: updateLearningMaterialDto.gradeLevel,
                  chapter: updateLearningMaterialDto.chapter,
                  section: updateLearningMaterialDto.section,
                  subject: updateLearningMaterialDto.subject,
                  videos: updateLearningMaterialDto.videos,
                },
                $pull: { pdfFiles: learningMaterial.pdfFiles[i] },
              },
              { new: true }
            );
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
                await this.learningMaterialModel.findByIdAndUpdate(
                  id,
                  { $pull: { pdfFiles: learningMaterial.pdfFiles[i] } },
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
          message: "درس نامه با موفقیت بروزرسانی شد.",
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
      const findLearningMaterial = await this.learningMaterialModel.findOne({
        _id: id,
      });

      if (findLearningMaterial) {
        const deleteBook = await this.learningMaterialModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "درس نامه مورد نظر پیدا نشد",
          });
        }

        if (findLearningMaterial && findLearningMaterial.pdfFiles.length > 0) {
          if (findLearningMaterial.pdfFiles.length > 0) {
            for (let i = 0; i < findLearningMaterial.pdfFiles.length; i++) {
              const file = findLearningMaterial.pdfFiles[i].link;
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
