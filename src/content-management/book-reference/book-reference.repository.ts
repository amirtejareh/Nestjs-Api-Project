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

import { Model, Types } from "mongoose";
import * as fs from "fs";
import { ImageService } from "../../common/services/imageService";
import { existsSync } from "fs";
import { BookReference } from "./entities/book-reference.entity";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBookReferenceDto } from "./dto/create-book-reference.dto";
import { UpdateBookReferenceDto } from "./dto/update-book-reference.dto";

@Injectable()
export class BookReferenceRepository {
  constructor(
    @InjectModel(BookReference.name)
    private readonly BookReferenceModel: Model<BookReference>,
    private readonly imageService: ImageService
  ) {}

  async create(@Res() res, createBookReferenceDto: CreateBookReferenceDto) {
    try {
      const createBookReferenceModel = await this.BookReferenceModel.create(
        createBookReferenceDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک کتاب مرجع با موفقیت ایجاد شد",
        data: createBookReferenceModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.BookReferenceModel.find({}).populate(["gradeLevels"]);
  }

  async findBookReferencesBasedOnGradeLevels(gradeLevels: string[]) {
    const BookReferences = await this.BookReferenceModel.find({
      gradeLevels: {
        $in: gradeLevels.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return BookReferences;
  }

  findOne(id: string) {
    return this.BookReferenceModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateBookReferenceDto: UpdateBookReferenceDto
  ) {
    try {
      const BookReference = await this.BookReferenceModel.findById(id);

      if (!BookReference) {
        throw new NotFoundException("کتاب مرجع مورد نظر یافت نشد.");
      }

      const updateBookReferencelModel =
        await this.BookReferenceModel.findByIdAndUpdate(
          id,
          updateBookReferenceDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "کتاب مرجع با موفقیت بروزرسانی شد.",
        data: updateBookReferencelModel,
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
      const findOneBookReference = await this.findOne(id);

      if (findOneBookReference) {
        const deleteBookReference = await this.BookReferenceModel.deleteOne({
          _id: id,
        });
        if (!deleteBookReference) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "کتاب مرجع مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "کتاب مرجع مورد نظر با موفقیت حذف شد",
          data: deleteBookReference,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "کتاب مرجع مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف کتاب مرجع مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
