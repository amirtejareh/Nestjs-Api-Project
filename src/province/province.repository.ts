import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { Province } from "./entities/province.entity";

@Injectable()
export class ProvinceRepository {
  constructor(
    @InjectModel(Province.name)
    private readonly ProvinceModel: Model<Province>
  ) {}

  async findOneByTitle(title: string) {
    return this.ProvinceModel.findOne({ title }).exec();
  }

  async create(@Res() res, createProvinceDto: CreateProvinceDto) {
    try {
      const createProvinceModel = await this.ProvinceModel.create(
        createProvinceDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک شهر با موفقیت ایجاد شد",
        data: createProvinceModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.ProvinceModel.find({});
  }

  findOne(id: string) {
    return this.ProvinceModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateProvinceDto: UpdateProvinceDto
  ) {
    try {
      const Province = await this.ProvinceModel.findById(id);

      if (!Province) {
        throw new NotFoundException("شهر مورد نظر یافت نشد.");
      }

      const updateProvincelModel = await this.ProvinceModel.findByIdAndUpdate(
        id,
        updateProvinceDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "شهر با موفقیت بروزرسانی شد.",
        data: updateProvincelModel,
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
      const findOneProvince = await this.findOne(id);

      if (findOneProvince) {
        const deleteProvince = await this.ProvinceModel.deleteOne({
          _id: id,
        });
        if (!deleteProvince) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "شهر مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "شهر مورد نظر با موفقیت حذف شد",
          data: deleteProvince,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "شهر مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف شهر مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
