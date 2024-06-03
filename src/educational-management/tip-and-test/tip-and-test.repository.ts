import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { CreateTipAndTestDto } from "./dto/create-tip-and-test.dto";
import { UpdateTipAndTestDto } from "./dto/update-tip-and-test.dto";
import { TipAndTest } from "./entities/tip-and-test.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";

@Injectable()
export class TipAndTestRepository {
  constructor(
    @InjectModel(TipAndTest.name)
    private readonly tipAndTestModel: Model<TipAndTest>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.tipAndTestModel.findOne({ title }).exec();
  }

  async findBasedOnBooks(books: string[]) {
    const tipAndTests = await this.tipAndTestModel
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
    return tipAndTests;
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createTipAndTestDto: CreateTipAndTestDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/tip-and-test",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createTipAndTestDto.pdfFiles = pdfFilesPath;
      }
      const createTipAndTest = await this.tipAndTestModel.create(
        createTipAndTestDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک نکته و تست با موفقیت ایجاد شد.",
        data: createTipAndTest,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.tipAndTestModel.find({});
  }

  findOne(id: string) {
    return this.tipAndTestModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const tipAndTest = await this.tipAndTestModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return tipAndTest;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateTipAndTestDto: UpdateTipAndTestDto
  ) {
    try {
      const tipAndTest = await this.tipAndTestModel.findOne({
        _id: id,
      });

      if (!tipAndTest) {
        throw new NotFoundException("نکته و تست مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/tip-and-test",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }

        updateTipAndTestDto.pdfFiles = pdfFilesPath;

        if (tipAndTest.pdfFiles.length > 0) {
          for (let i = 0; i < tipAndTest.pdfFiles.length; i++) {
            const file = tipAndTest.pdfFiles[i].link;
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

        const updateTipAndTestModel =
          await this.tipAndTestModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateTipAndTestDto.book,
                gradeLevel: updateTipAndTestDto.gradeLevel,
                chapter: updateTipAndTestDto.chapter,
                section: updateTipAndTestDto.section,
                subject: updateTipAndTestDto.subject,
                videos: updateTipAndTestDto.videos,
              },
              $push: {
                pdfFiles: { $each: updateTipAndTestDto.pdfFiles },
              },
            },
            {
              new: true,
            }
          );

        return res.status(200).json({
          statusCode: 200,
          message: "نکته و تست با موفقیت بروزرسانی شد.",
          data: updateTipAndTestModel,
        });
      }

      if (pdfFiles && pdfFiles.length == 0) {
        if (updateTipAndTestDto?.pdfFiles?.length > 0) {
          let arrayConversion = updateTipAndTestDto.pdfFiles.map(
            (element: any) => {
              return { name: JSON.parse(element).name };
            }
          );
          if (tipAndTest.pdfFiles.length > 0) {
            for (let i = 0; i < tipAndTest.pdfFiles.length; i++) {
              const file = tipAndTest.pdfFiles[i].link;

              let findIndex = arrayConversion.findIndex((element) => {
                return element.name == file.split("/")[3];
              });

              if (findIndex == -1) {
                if (existsSync(file)) {
                  try {
                    fs.unlinkSync(`${file}`);
                    await this.tipAndTestModel.findByIdAndUpdate(
                      id,

                      {
                        $set: {
                          book: updateTipAndTestDto.book,
                          gradeLevel: updateTipAndTestDto.gradeLevel,
                          chapter: updateTipAndTestDto.chapter,
                          section: updateTipAndTestDto.section,
                          subject: updateTipAndTestDto.subject,
                          videos: updateTipAndTestDto.videos,
                        },
                        $pull: { pdfFiles: tipAndTest.pdfFiles[i] },
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

          await this.tipAndTestModel.findByIdAndUpdate(
            id,

            {
              $set: {
                book: updateTipAndTestDto.book,
                gradeLevel: updateTipAndTestDto.gradeLevel,
                chapter: updateTipAndTestDto.chapter,
                section: updateTipAndTestDto.section,
                subject: updateTipAndTestDto.subject,
                videos: updateTipAndTestDto.videos,
              },
            },
            {
              new: true,
            }
          );
        } else {
          for (let i = 0; i < tipAndTest.pdfFiles.length; i++) {
            const file = tipAndTest.pdfFiles[i].link;
            await this.tipAndTestModel.findByIdAndUpdate(
              id,
              {
                $set: {
                  book: updateTipAndTestDto.book,
                  gradeLevel: updateTipAndTestDto.gradeLevel,
                  chapter: updateTipAndTestDto.chapter,
                  section: updateTipAndTestDto.section,
                  subject: updateTipAndTestDto.subject,
                  videos: updateTipAndTestDto.videos,
                },
                $pull: { pdfFiles: tipAndTest.pdfFiles[i] },
              },
              { new: true }
            );
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
                await this.tipAndTestModel.findByIdAndUpdate(
                  id,
                  { $pull: { pdfFiles: tipAndTest.pdfFiles[i] } },
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
          message: "نکته و تست با موفقیت بروزرسانی شد.",
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
      const findTipAndTest = await this.tipAndTestModel.findOne({ _id: id });

      if (findTipAndTest) {
        const deleteBook = await this.tipAndTestModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "نکته و تست مورد نظر پیدا نشد",
          });
        }

        if (findTipAndTest && findTipAndTest.pdfFiles.length > 0) {
          if (findTipAndTest.pdfFiles.length > 0) {
            for (let i = 0; i < findTipAndTest.pdfFiles.length; i++) {
              const file = findTipAndTest.pdfFiles[i].link;
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
          message: "نکته و تست مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "نکته و تست مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف نکته و تست مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
