import {
  Body,
  HttpStatus,
  Injectable,
  Param,
  ParseArrayPipe,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ObjectiveTestManagement } from "./entities/objective-test-management.entity";
import { CreateObjectiveTestManagementDto } from "./dto/create-objective-test-management.dto";
import { UpdateObjectiveTestManagementDto } from "./dto/update-objective-test-management.dto";

@Injectable()
export class ObjectiveTestManagementRepository {
  constructor(
    @InjectModel(ObjectiveTestManagement.name)
    private readonly objectiveTestModel: Model<ObjectiveTestManagement>
  ) {}

  async findOneByTitle(title: string) {
    return this.objectiveTestModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @Body() createObjectiveTestManagementDto: CreateObjectiveTestManagementDto
  ) {
    try {
      const createObjectiveTestManagementModel =
        await this.objectiveTestModel.create(createObjectiveTestManagementDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک آزمون تستی با موفقیت ایجاد شد",
        data: createObjectiveTestManagementModel,
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

    const objectiveTestIds = await this.objectiveTestModel
      .find({})
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalObjectiveTests = await this.objectiveTestModel.countDocuments(
      {}
    );

    const objectiveTests = await this.objectiveTestModel
      .find({
        _id: {
          $in: objectiveTestIds,
        },
      })
      .populate([
        {
          path: "bookReferences",
          populate: {
            path: "gradeLevels",
          },
        },
        {
          path: "objectiveTest",
          populate: {
            path: "gradeLevel",
          },
        },
      ]);

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

  findOne(@Param("id") id: string) {
    return this.objectiveTestModel.findOne({ _id: id });
  }

  getObjectiveTestsBasedNumber(
    @Param("objectiveTestId") objectiveTests: string
  ) {
    return this.objectiveTestModel
      .find({
        objectiveTest: new Types.ObjectId(objectiveTests),
      })
      .populate("bookReferences");
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateObjectiveTestManagementDto
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
      const findOneObjectiveTestManagement = await this.findOne(id);
      if (!findOneObjectiveTestManagement) {
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
