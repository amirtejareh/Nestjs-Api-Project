import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Param, Res, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ImageService } from '../../common/services/imageService';
import * as fs from "fs";
import { existsSync } from 'fs';
import { BookExercises } from './entities/book-exercises.entity';
import { CreateBookExercisesDto } from './dto/create-book-exercises.dto';
import { UpdateBookExercisesDto } from './dto/update-book-exercises.dto';

@Injectable()
export class BookExercisesRepository {
  constructor(
    @InjectModel(BookExercises.name)
    private readonly bookExercisesModel: Model<BookExercises>,
    private readonly imageService: ImageService
  ) { }

  async findOneByTitle(title: string) {
    return this.bookExercisesModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createBookExercisesDto: CreateBookExercisesDto
  ) {
    try {
      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = []
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage("book-exercises", file);
          pdfFilesPath.push(fileName);
        }
        createBookExercisesDto.pdfFiles = pdfFilesPath;
      }
      const createBookExercises = await this.bookExercisesModel.create(createBookExercisesDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک تمرین کتاب با موفقیت ایجاد شد.",
        data: createBookExercises,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.bookExercisesModel.find({});
  }

  findOne(id: string) {
    return this.bookExercisesModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const bookExercises = await this.bookExercisesModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return bookExercises;
  }

  async update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    @Param("id") id: string,
    updateBookExercisesDto: UpdateBookExercisesDto
  ) {
    try {
      const bookExercises = await this.bookExercisesModel.findOne({ _id: id });

      if (!bookExercises) {
        throw new NotFoundException("تمرین کتاب مورد نظر یافت نشد.");
      }

      if (pdfFiles && pdfFiles.length > 0) {
        let pdfFilesPath: string[] = []

        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          const fileName = await this.imageService.saveImage("book-exercises", file);
          pdfFilesPath.push(fileName);
        }
        updateBookExercisesDto.pdfFiles = pdfFilesPath;

        if (bookExercises.pdfFiles.length > 0) {
          for (let i = 0; i < bookExercises.pdfFiles.length; i++) {
            const file = bookExercises.pdfFiles[i];
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

      const updateBookExercisesModel = await this.bookExercisesModel.findByIdAndUpdate(
        id,
        updateBookExercisesDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "تمرین کتاب با موفقیت بروزرسانی شد.",
        data: updateBookExercisesModel,
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
      const findBookExercises = await this.bookExercisesModel.findOne({ _id: id });

      if (findBookExercises) {
        const deleteBookExercises = await this.bookExercisesModel.deleteOne({
          _id: id,
        });
        if (!deleteBookExercises) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "تمرین کتاب مورد نظر پیدا نشد",
          });
        }

        if (findBookExercises && findBookExercises.pdfFiles.length > 0) {

          if (findBookExercises.pdfFiles.length > 0) {
            for (let i = 0; i < findBookExercises.pdfFiles.length; i++) {
              const file = findBookExercises.pdfFiles[i];
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
          message: "تمرین کتاب مورد نظر با موفقیت حذف شد",
          data: deleteBookExercises,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "تمرین کتاب مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف تمرین کتاب مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
