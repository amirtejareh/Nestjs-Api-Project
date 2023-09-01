import { Body, HttpStatus, Injectable, Param, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OnlineGradeReport } from "./entities/online-grade-report.entity";
import { CreateOnlineGradeReportDto } from "./dto/create-online-grade-report.dto";
import { UpdateOnlineGradeReportDto } from "./dto/update-online-grade-report.dto";

@Injectable()
export class OnlineGradeReportRepository {
  constructor(
    @InjectModel(OnlineGradeReport.name)
    private readonly onlineGradeReportModel: Model<OnlineGradeReport>
  ) {}

  async findOneByTitle(title: string) {
    return this.onlineGradeReportModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @Body() createOnlineGradeReportDto: CreateOnlineGradeReportDto
  ) {
    console.log(createOnlineGradeReportDto);

    return;
    try {
      const createOnlineGradeReportModel =
        await this.onlineGradeReportModel.create(createOnlineGradeReportDto);
      return res.status(200).json({
        statusCode: 200,
        message: "کارنامه شما با موفقیت صادر شد",
        data: createOnlineGradeReportModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.onlineGradeReportModel.find({});
  }

  findOne(@Param("id") id: string) {
    return this.onlineGradeReportModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateOnlineGradeReportDto: UpdateOnlineGradeReportDto
  ) {
    try {
      const updateSectionModel =
        await this.onlineGradeReportModel.findOneAndUpdate(
          { _id: id },
          { $set: { ...updateOnlineGradeReportDto } },
          { new: true }
        );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "گزارش کارنامه مورد نظر با موفقیت بروزرسانی شد",
        data: updateSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی گزارش کارنامه مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const findOneObjectiveTest = await this.findOne(id);
      if (!findOneObjectiveTest) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون تستی مورد نظر پیدا نشد",
        });
      }

      const deleteOnlineGradeReportModel =
        await this.onlineGradeReportModel.deleteOne({
          _id: id,
        });
      if (!deleteOnlineGradeReportModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "کارنامه مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "گزارش کارنامه مورد نظر با موفقیت حذف شد",
        data: deleteOnlineGradeReportModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف گزارش کارنامه مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
