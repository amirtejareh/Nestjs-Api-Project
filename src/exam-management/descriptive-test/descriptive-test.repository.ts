import { Body, HttpStatus, Injectable, Param, Res } from "@nestjs/common";
import { CreateDescriptiveTestDto } from "./dto/create-descriptive-test.dto";
import { UpdateDescriptiveTestDto } from "./dto/update-descriptive-test.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DescriptiveTest } from "./entities/descriptive-test.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class DescriptiveTestRepository {
  constructor(
    @InjectModel(DescriptiveTest.name)
    private readonly descriptiveTestModel: Model<DescriptiveTest>
  ) { }

  async findOneByTitle(title: string) {
    return this.descriptiveTestModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @Body() createDescriptiveTestDto: CreateDescriptiveTestDto
  ) {
    try {
      const createDescriptiveTestModel = await this.descriptiveTestModel.create(
        createDescriptiveTestDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک آزمون تشریحی با موفقیت ایجاد شد",
        data: createDescriptiveTestModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    const today = new Date().toISOString();

    return this.descriptiveTestModel
      .find({})
      .populate("gradeLevel")
      .sort({ start: "asc" });
  }

  async findDescriptiveTestsBasedOnGradeLevels(
    page: number = 1,
    limit: number = 10,
    gradeLevels: string[]
  ) {
    const skip = (page - 1) * limit;

    const descriptiveTestIds = await this.descriptiveTestModel
      .find({
        gradeLevel: gradeLevels,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalDescriptiveTests = await this.descriptiveTestModel.countDocuments({
      gradeLevel: {
        $in: [gradeLevels],
      },
    });

    const descriptiveTests = await this.descriptiveTestModel
      .find({
        _id: {
          $in: descriptiveTestIds,
        },
      })
      .populate("gradeLevel");

    if (descriptiveTests.length === 0) {
      return [];
    }

    return {
      objectiveTests: descriptiveTests,
      currentPage: page,
      totalPages: Math.ceil(totalDescriptiveTests / limit),
      totalItems: totalDescriptiveTests,
    };
  }

  findMainDescriptiveTest() {
    const today = new Date().toISOString();

    return this.descriptiveTestModel
      .find({})
      .populate("gradeLevel")
      .sort({ start: "asc" });
  }

  findOne(@Param("id") id: string) {
    return this.descriptiveTestModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateDescriptiveTestDto
  ) {
    try {
      const updateSectionModel = await this.descriptiveTestModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateSectionDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون تشریحی مورد نظر با موفقیت بروزرسانی شد",
        data: updateSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی آزمون تشریحی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const findOneDescriptiveTest = await this.findOne(id);
      if (!findOneDescriptiveTest) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون تشریحی مورد نظر پیدا نشد",
        });
      }

      const deleteSectionModel = await this.descriptiveTestModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون تشریحی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون تشریحی مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف آزمون تشریحی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
