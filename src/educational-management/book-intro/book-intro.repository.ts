import {
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
import { BookIntro } from "./entities/book-intro.entity";
import { CreateBookIntroDto } from "./dto/create-book-intro.dto";
import { UpdateBookIntroDto } from "./dto/update-book-intro.dto";

@Injectable()
export class BookIntroRepository {
  constructor(
    @InjectModel(BookIntro.name)
    private readonly bookIntroModel: Model<BookIntro>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.bookIntroModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createBookIntroDto: CreateBookIntroDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: { title: string; link: string }[] = [];
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "book-exercises",
            file
          );

          pdfFilesPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }
        createBookIntroDto.pdfFiles = pdfFilesPath;
      }
      const createBookIntro = await this.bookIntroModel.create(
        createBookIntroDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک معرفی کتاب با موفقیت ایجاد شد.",
        data: createBookIntro,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.bookIntroModel.find({});
  }

  findOne(id: string) {
    return this.bookIntroModel.findOne({ _id: id });
  }
  async findBasedOnBooks(books: string[]) {
    const bookIntro = await this.bookIntroModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book"]);

    return bookIntro;
  }

  async findBasedOnBooksAndType(books: string[], type: string) {
    const bookIntro = await this.bookIntroModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
        type: type,
      })
      .populate(["book"]);

    return bookIntro;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateBookIntroDto: UpdateBookIntroDto
  ) {
    try {
      const bookIntro = await this.bookIntroModel.findOne({ _id: id });

      if (!bookIntro) {
        throw new NotFoundException("معرفی کتاب مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = [];

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage(
            "book-exercises",
            file
          );
          pdfFilesPath.push(fileName);
        }
        updateBookIntroDto.pdfFiles = pdfFilesPath;

        if (bookIntro.pdfFiles.length > 0) {
          for (let i = 0; i < bookIntro.pdfFiles.length; i++) {
            const file = bookIntro.pdfFiles[i];
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

      const updateBookIntroModel = await this.bookIntroModel.findByIdAndUpdate(
        id,
        updateBookIntroDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "معرفی کتاب با موفقیت بروزرسانی شد.",
        data: updateBookIntroModel,
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
      const findBookIntro = await this.bookIntroModel.findOne({
        _id: id,
      });

      if (findBookIntro) {
        const deleteBookIntro = await this.bookIntroModel.deleteOne({
          _id: id,
        });
        if (!deleteBookIntro) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "معرفی کتاب مورد نظر پیدا نشد",
          });
        }

        if (findBookIntro && findBookIntro.pdfFiles.length > 0) {
          if (findBookIntro.pdfFiles.length > 0) {
            for (let i = 0; i < findBookIntro.pdfFiles.length; i++) {
              const file = findBookIntro.pdfFiles[i];
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
          message: "معرفی کتاب مورد نظر با موفقیت حذف شد",
          data: deleteBookIntro,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "معرفی کتاب مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف معرفی کتاب مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
