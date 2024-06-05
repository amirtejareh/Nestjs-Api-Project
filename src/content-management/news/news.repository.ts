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
import { Model } from "mongoose";
import { News } from "./entities/news.entity";
import * as fs from "fs";
import { ImageService } from "../../common/services/imageService";
import { existsSync } from "fs";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsRepository {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.newsModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    createNewsDto: CreateNewsDto
  ) {
    try {
      if (file) {
        const fileName = await this.imageService.saveImage(
          "content_management/image_news",
          file
        );
        createNewsDto.image = fileName;
      }

      const createNewsModel = await this.newsModel.create(createNewsDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک خبر با موفقیت ایجاد شد",
        data: createNewsModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.newsModel.find({});
  }

  async findSome(limit: number = 10) {
    const newsIds = await this.newsModel.find({}).limit(limit).select("_id");

    const totalnews = await this.newsModel.countDocuments({});

    const news = await this.newsModel.find({
      _id: {
        $in: newsIds,
      },
    });

    if (news.length === 0) {
      return [];
    }

    return {
      news,
      totalPages: Math.ceil(totalnews / limit),
      totalItems: totalnews,
    };
  }

  findOne(id: string) {
    return this.newsModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @UploadedFile() file,
    @Param("id") id: string,
    updateNewsDto: UpdateNewsDto
  ) {
    try {
      const news = await this.newsModel.findById(id);

      if (!news) {
        throw new NotFoundException("خبر مورد نظر یافت نشد.");
      }

      if (file) {
        const fileName = await this.imageService.saveImage(
          "content_management/image_news",
          file
        );
        updateNewsDto.image = fileName;

        if (existsSync(news.image)) {
          try {
            fs.unlinkSync(`${news.image}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }
      }

      const updateNewslModel = await this.newsModel.findByIdAndUpdate(
        id,
        updateNewsDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "خبر با موفقیت بروزرسانی شد.",
        data: updateNewslModel,
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
      const findOneNews = await this.findOne(id);

      if (findOneNews) {
        const deleteNews = await this.newsModel.deleteOne({
          _id: id,
        });
        if (!deleteNews) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "خبر مورد نظر پیدا نشد",
          });
        }

        if (existsSync(findOneNews.image)) {
          try {
            fs.unlinkSync(`${findOneNews.image}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل قدیمی رخ داده است."
            );
          }
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "خبر مورد نظر با موفقیت حذف شد",
          data: deleteNews,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "خبر مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف خبر مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
