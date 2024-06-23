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
import { ContentEducationalPricing } from "./entities/content_educational_pricing.controller.entity";
import { CreateContentEducationalPricingDto } from "./dto/create-content_educational_pricing.dto";
import { UpdateContentEducationalPricingDto } from "./dto/update-content_educational_pricing.dto";

@Injectable()
export class ContentEducationalPricingRepository {
  constructor(
    @InjectModel(ContentEducationalPricing.name)
    private readonly contentEducationalPricingModel: Model<ContentEducationalPricing>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.contentEducationalPricingModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    createContentEducationalPricingDto: CreateContentEducationalPricingDto
  ) {
    try {
      const createContentEducationalPricing =
        await this.contentEducationalPricingModel.create(
          createContentEducationalPricingDto
        );
      return res.status(200).json({
        statusCode: 200,
        message: "یک قیمت گذاری جدید با موفقیت ایجاد شد.",
        data: createContentEducationalPricing,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.contentEducationalPricingModel
      .find({})
      .populate(["gradeLevel", "book"]);
  }

  findOne(id: string) {
    return this.contentEducationalPricingModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateContentEducationalPricingDto: UpdateContentEducationalPricingDto
  ) {
    try {
      const contentEducationalPricing =
        await this.contentEducationalPricingModel.findOne({ _id: id });

      if (!contentEducationalPricing) {
        throw new NotFoundException("قیمت گذاری مورد نظر یافت نشد.");
      }

      const updateContentEducationalPricingModel =
        await this.contentEducationalPricingModel.findByIdAndUpdate(
          id,
          updateContentEducationalPricingDto,
          {
            new: true,
          }
        );

      return res.status(200).json({
        statusCode: 200,
        message: "قیمت گذاری مورد نظر با موفقیت بروزرسانی شد.",
        data: updateContentEducationalPricingModel,
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
      const findContentEducationalPricing =
        await this.contentEducationalPricingModel.findOne({
          _id: id,
        });

      if (findContentEducationalPricing) {
        const deleteContentEducationalPricing =
          await this.contentEducationalPricingModel.deleteOne({
            _id: id,
          });
        if (!deleteContentEducationalPricing) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "قیمت گذاری  مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "قیمت گذاری مورد نظر با موفقیت حذف شد",
          data: deleteContentEducationalPricing,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "قیمت گذاری مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف قیمت گذاری مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
