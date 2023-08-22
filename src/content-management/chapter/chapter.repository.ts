import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from "@nestjs/common";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Chapter } from "./entities/chapter.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class ChapterRepository {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<Chapter>
  ) {}

  async findOneByTitle(title: string) {
    return this.chapterModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() createChapterDto: CreateChapterDto) {
    try {
      if (await this.findOneByTitle(createChapterDto.title)) {
        throw new ConflictException("درج فصل تکراری امکان‌پذیر نمی‌باشد.");
      }

      const createChapterModel = await this.chapterModel.create(
        createChapterDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک فصل با موفقیت ایجاد شد",
        data: createChapterModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.chapterModel.find({}).populate("books");
  }

  async findChaptersBasedOnBooks(books: string[]) {
    const chapters = await this.chapterModel.find({
      books: {
        $in: books.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return chapters;
  }

  findOne(@Param("id") id: string) {
    return this.chapterModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateChapterDto: UpdateChapterDto
  ) {
    try {
      const updateChapterModel = await this.chapterModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateChapterDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "فصل مورد نظر با موفقیت بروزرسانی شد",
        data: updateChapterModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی فصل مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteChapterModel = await this.chapterModel.deleteOne({
        _id: id,
      });
      if (!deleteChapterModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "فصل مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "فصل مورد نظر با موفقیت حذف شد",
        data: deleteChapterModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف فصل مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
