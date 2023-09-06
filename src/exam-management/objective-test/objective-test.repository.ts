import { Body, HttpStatus, Injectable, Param, Res } from "@nestjs/common";
import { CreateObjectiveTestDto } from "./dto/create-objective-test.dto";
import { UpdateObjectiveTestDto } from "./dto/update-objective-test.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectiveTest } from "./entities/objective-test.entity";
import { Model, Types } from "mongoose";

@Injectable()
export class ObjectiveTestRepository {
  constructor(
    @InjectModel(ObjectiveTest.name)
    private readonly objectiveTestModel: Model<ObjectiveTest>
  ) {}

  async findOneByTitle(title: string) {
    return this.objectiveTestModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @Body() createObjectiveTestDto: CreateObjectiveTestDto
  ) {
    try {
      const createObjectiveTestModel = await this.objectiveTestModel.create(
        createObjectiveTestDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک آزمون تستی با موفقیت ایجاد شد",
        data: createObjectiveTestModel,
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

    return this.objectiveTestModel
      .find({})
      .populate("gradeLevel")
      .sort({ start: "asc" });
  }

  async findObjectiveTestsBasedOnGradeLevels(
    page: number = 1,
    limit: number = 10,
    gradeLevels: string[]
  ) {
    const skip = (page - 1) * limit;

    const objectiveTestIds = await this.objectiveTestModel
      .find({
        gradeLevel: gradeLevels,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalObjectiveTests = await this.objectiveTestModel.countDocuments({
      gradeLevel: {
        $in: [gradeLevels],
      },
    });

    const objectiveTests = await this.objectiveTestModel
      .find({
        _id: {
          $in: objectiveTestIds,
        },
      })
      .populate("gradeLevel");

    if (objectiveTests.length === 0) {
      return [];
    }

    return {
      objectiveTests,
      currentPage: page,
      totalPages: Math.ceil(totalObjectiveTests / limit),
      totalItems: totalObjectiveTests,
    };
  }

  findMainObjectiveTest() {
    const today = new Date().toISOString();

    return this.objectiveTestModel
      .find({})
      .populate("gradeLevel")
      .sort({ start: "asc" });
  }

  findOne(@Param("id") id: string) {
    return this.objectiveTestModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateObjectiveTestDto
  ) {
    try {
      const updateSectionModel = await this.objectiveTestModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...updateSectionDto } },
        { new: true }
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون تستی مورد نظر با موفقیت بروزرسانی شد",
        data: updateSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در بروزرسانی آزمون تستی مورد نظر به وجود آمده است",
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

      const deleteSectionModel = await this.objectiveTestModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون تستی مورد نظر پیدا نشد",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون تستی مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف آزمون تستی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
