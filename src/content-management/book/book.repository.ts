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
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Book } from "./entities/book.entity";
import * as fs from "fs";
import { ImageService } from "../../common/services/imageService";
import { existsSync } from "fs";

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.bookModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    createBookDto: CreateBookDto
  ) {
    try {
      if (await this.findOneByTitle(createBookDto.title)) {
        throw new ConflictException("درج کتاب تکراری امکان‌پذیر نمی‌باشد.");
      }

      if (file) {
        const fileName = await this.imageService.saveImage("image_book", file);
        createBookDto.image = fileName;
      }

      const createBookModel = await this.bookModel.create(createBookDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک کتاب با موفقیت ایجاد شد",
        data: createBookModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.bookModel.find({});
  }

  async findBooksBasedOnGradeLevels(gradeLevels: string[]) {
    const books = await this.bookModel.find({
      gradeLevels: {
        $in: gradeLevels.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return books;
  }

  findOne(id: string) {
    return this.bookModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @UploadedFile() file,
    @Param("id") id: string,
    updateBookDto: UpdateBookDto
  ) {
    try {
      const book = await this.bookModel.findById(id);

      if (!book) {
        throw new NotFoundException("کتاب مورد نظر یافت نشد.");
      }

      if (file) {
        const fileName = await this.imageService.saveImage("image_book", file);
        updateBookDto.image = fileName;

        if (existsSync(book.image)) {
          try {
            fs.unlinkSync(`${book.image}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }
      }

      const updateBooklModel = await this.bookModel.findByIdAndUpdate(
        id,
        updateBookDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "کتاب با موفقیت بروزرسانی شد.",
        data: updateBooklModel,
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
      const findOneBook = await this.findOne(id);

      if (findOneBook) {
        const deleteBook = await this.bookModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "کتاب مورد نظر پیدا نشد",
          });
        }

        if (existsSync(findOneBook.image)) {
          try {
            fs.unlinkSync(`${findOneBook.image}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "کتاب مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "کتاب مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف کتاب مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
