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
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";
import { Karanbala } from "./entities/karanbala.entity";
import { CreateKaranbalaDto } from "./dto/create-karanbala.dto";
import { UpdateKaranbalaDto } from "./dto/update-karanbala.dto";

@Injectable()
export class KaranbalaRepository {
  constructor(
    @InjectModel(Karanbala.name)
    private readonly karanbalaModel: Model<Karanbala>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.karanbalaModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createKaranbalaDto: CreateKaranbalaDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/karanbala",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createKaranbalaDto.pdfFiles = pdfFilesPath;
      }
      const createKaranbala = await this.karanbalaModel.create(
        createKaranbalaDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک کران بالا با موفقیت ایجاد شد.",
        data: createKaranbala,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.karanbalaModel.find({});
  }

  findOne(id: string) {
    return this.karanbalaModel.findOne({ _id: id });
  }

  async findBasedOnBooks(books: string[]) {
    const essayQuestions = await this.karanbalaModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter", "section", "subject"]);

    return essayQuestions;
  }

  async findBasedOnSubjects(subjects: string[]) {
    const karanbalas = await this.karanbalaModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return karanbalas;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateKaranbalaDto: UpdateKaranbalaDto
  ) {
    try {
      const karanbala = await this.karanbalaModel.findOne({
        _id: id,
      });

      if (!karanbala) {
        throw new NotFoundException("کران بالا مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/karanbala",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }

        updateKaranbalaDto.pdfFiles = pdfFilesPath;

        if (karanbala.pdfFiles.length > 0) {
          for (let i = 0; i < karanbala.pdfFiles.length; i++) {
            const file = karanbala.pdfFiles[i].link;
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

        const updateKaranbalaModel =
          await this.karanbalaModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateKaranbalaDto.book,
                gradeLevel: updateKaranbalaDto.gradeLevel,
                chapter: updateKaranbalaDto.chapter,
                section: updateKaranbalaDto.section,
                subject: updateKaranbalaDto.subject,
                videos: updateKaranbalaDto.videos,
              },
              $push: {
                pdfFiles: { $each: updateKaranbalaDto.pdfFiles },
              },
            },
            {
              new: true,
            }
          );

        return res.status(200).json({
          statusCode: 200,
          message: "کران بالا با موفقیت بروزرسانی شد.",
          data: updateKaranbalaModel,
        });
      }

      if (pdfFiles && pdfFiles.length == 0) {
        if (updateKaranbalaDto?.pdfFiles?.length > 0) {
          let arrayConversion = updateKaranbalaDto.pdfFiles.map(
            (element: any) => {
              return { name: JSON.parse(element).name };
            }
          );
          if (karanbala.pdfFiles.length > 0) {
            for (let i = 0; i < karanbala.pdfFiles.length; i++) {
              const file = karanbala.pdfFiles[i].link;

              let findIndex = arrayConversion.findIndex((element) => {
                return element.name == file.split("/")[3];
              });

              if (findIndex == -1) {
                if (existsSync(file)) {
                  try {
                    fs.unlinkSync(`${file}`);
                    await this.karanbalaModel.findByIdAndUpdate(
                      id,

                      {
                        $set: {
                          book: updateKaranbalaDto.book,
                          gradeLevel: updateKaranbalaDto.gradeLevel,
                          chapter: updateKaranbalaDto.chapter,
                          section: updateKaranbalaDto.section,
                          subject: updateKaranbalaDto.subject,
                          videos: updateKaranbalaDto.videos,
                        },
                        $pull: { pdfFiles: karanbala.pdfFiles[i] },
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

          await this.karanbalaModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateKaranbalaDto.book,
                gradeLevel: updateKaranbalaDto.gradeLevel,
                chapter: updateKaranbalaDto.chapter,
                section: updateKaranbalaDto.section,
                subject: updateKaranbalaDto.subject,
                videos: updateKaranbalaDto.videos,
              },
            },
            {
              new: true,
            }
          );
        } else {
          for (let i = 0; i < karanbala.pdfFiles.length; i++) {
            const file = karanbala.pdfFiles[i].link;
            await this.karanbalaModel.findByIdAndUpdate(
              id,
              {
                $set: {
                  book: updateKaranbalaDto.book,
                  gradeLevel: updateKaranbalaDto.gradeLevel,
                  chapter: updateKaranbalaDto.chapter,
                  section: updateKaranbalaDto.section,
                  subject: updateKaranbalaDto.subject,
                  videos: updateKaranbalaDto.videos,
                },
                $pull: { pdfFiles: karanbala.pdfFiles[i] },
              },
              { new: true }
            );
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
                await this.karanbalaModel.findByIdAndUpdate(
                  id,
                  { $pull: { pdfFiles: karanbala.pdfFiles[i] } },
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
          message: "کران بالا با موفقیت بروزرسانی شد.",
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
      const findKaranbala = await this.karanbalaModel.findOne({ _id: id });

      if (findKaranbala) {
        const deleteKaranbala = await this.karanbalaModel.deleteOne({
          _id: id,
        });
        if (!deleteKaranbala) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "کران بالا مورد نظر پیدا نشد",
          });
        }

        if (findKaranbala && findKaranbala.pdfFiles.length > 0) {
          if (findKaranbala.pdfFiles.length > 0) {
            for (let i = 0; i < findKaranbala.pdfFiles.length; i++) {
              const file = findKaranbala.pdfFiles[i].link;
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
          message: "کران بالا مورد نظر با موفقیت حذف شد",
          data: deleteKaranbala,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "کران بالا مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف کران بالا مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
