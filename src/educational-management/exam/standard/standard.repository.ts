import { Body, HttpStatus, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Standard } from "./entities/standard.entity";
import { UpdateStandardDto } from "./dto/update-standard.dto";
import { CreateStandardDto } from "./dto/create-standard.dto";

@Injectable()
export class StandardRepository {
  constructor(
    @InjectModel(Standard.name)
    private readonly standardModel: Model<Standard>
  ) {}

  async findOneByTitle(title: string) {
    return this.standardModel.findOne({ title }).exec();
  }
  async create(@Res() res, @Body() CreateStandardDto: CreateStandardDto) {
    try {
      const createStandardModel = await this.standardModel.create(
        CreateStandardDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "شناسنامه سوال با موفقیت ایجاد شد",
        data: createStandardModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const standards = await this.standardModel.find({}).skip(skip).limit(limit);
    const totalStandards = await this.standardModel.find({}).count();

    if (standards.length == 0) {
      return [];
    }
    return {
      standards,
      currentPage: page,
      totalPages: Math.ceil(totalStandards / limit),
      totalItems: totalStandards,
    };
  }

  async findStandardsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    const skip = (page - 1) * limit;

    const standardIds = await this.standardModel
      .find({
        books: books,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalStandards = await this.standardModel.countDocuments({
      books: {
        $in: [books],
      },
    });

    const standards = await this.standardModel
      .find({
        _id: {
          $in: standardIds,
        },
      })
      .populate("books");

    if (standards.length === 0) {
      return [];
    }

    return {
      standards,
      currentPage: page,
      totalPages: Math.ceil(totalStandards / limit),
      totalItems: totalStandards,
    };
  }

  findOne(@Param("id") id: string) {
    return this.standardModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateStandardDto: UpdateStandardDto
  ) {
    try {
      const updateStandardModel = await this.standardModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateStandardDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: " آزمون استاندارد مورد نظر با موفقیت بروزرسانی شد",
        data: updateStandardModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی آزمون استاندارد مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const deleteSectionModel = await this.standardModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون استاندارد مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون استاندارد مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف آزمون استاندارد مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
