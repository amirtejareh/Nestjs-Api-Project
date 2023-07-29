import { ConflictException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "./entities/book.entity";

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel("book")
    private readonly bookModel: Model<Book>
  ) {}

  async findOneByTitle(title: string) {
    return this.bookModel.findOne({ title }).exec();
  }

  async create(@Res() res, createBookDto: CreateBookDto) {
    try {
      if (await this.findOneByTitle(createBookDto.title)) {
        throw new ConflictException("درج کتاب تکراری امکان‌پذیر نمی‌باشد.");
      }

      const createBook = await this.bookModel.create(createBookDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک کتاب با موفقیت ایجاد شد",
        data: createBook,
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

  findOne(id: string) {
    return this.bookModel.findOne({});
  }

  async update(@Res() res, id: string, updateBookDto: UpdateBookDto) {
    try {
      const updateBook = await this.bookModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateBookDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: " کتاب مورد نظر با موفقیت بروزرسانی شد",
        data: updateBook,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی کتاب مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, id: string) {
    try {
      const deleteBook = await this.bookModel.deleteOne({
        _id: id,
      });
      if (!deleteBook) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "کتاب مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "کتاب مورد نظر با موفقیت حذف شد",
        data: deleteBook,
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
