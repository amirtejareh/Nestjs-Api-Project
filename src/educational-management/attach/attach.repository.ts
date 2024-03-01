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
import { Attach } from "./entities/attach.entity";
import { UpdateAttachDto } from "./dto/update-attach.dto";
import { CreateAttachDto } from "./dto/create-attach.dto";

@Injectable()
export class AttachRepository {
  constructor(
    @InjectModel(Attach.name)
    private readonly attachModel: Model<Attach>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.attachModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createAttachDto: CreateAttachDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/attach",
            file
          );
          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createAttachDto.pdfFiles = pdfFilesPath;
      }
      const createAttach = await this.attachModel.create(createAttachDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک ضمیمه با موفقیت ایجاد شد.",
        data: createAttach,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.attachModel.find({});
  }

  findOne(id: string) {
    return this.attachModel.findOne({ _id: id });
  }

  async findBasedOnChapters(chapters: string[]) {
    const attaches = await this.attachModel
      .find({
        chapter: {
          $in: chapters.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["chapter"]);

    return attaches;
  }

  async findBasedOnBooks(books: string[]) {
    const attaches = await this.attachModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter"]);

    return attaches;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateAttachDto: UpdateAttachDto
  ) {
    try {
      const attach = await this.attachModel.findOne({
        _id: id,
      });

      if (!attach) {
        throw new NotFoundException("ضمیمه مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/attach",
            file
          );
          pdfFilesPath.push(fileName);
        }
        updateAttachDto.pdfFiles = pdfFilesPath;

        if (attach.pdfFiles.length > 0) {
          for (let i = 0; i < attach.pdfFiles.length; i++) {
            const file = attach.pdfFiles[i];
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

      const updateAttachModel = await this.attachModel.findByIdAndUpdate(
        id,
        updateAttachDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "ضمیمه مورد نظر با موفقیت بروزرسانی شد.",
        data: updateAttachModel,
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
      const findAttach = await this.attachModel.findOne({
        _id: id,
      });

      if (findAttach) {
        const deleteBook = await this.attachModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "ضمیمه مورد نظر پیدا نشد",
          });
        }

        if (findAttach && findAttach.pdfFiles.length > 0) {
          if (findAttach.pdfFiles.length > 0) {
            for (let i = 0; i < findAttach.pdfFiles.length; i++) {
              const file = findAttach.pdfFiles[i];
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
