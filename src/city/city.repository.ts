import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { City } from "./entities/city.entity";

@Injectable()
export class CityRepository {
  constructor(
    @InjectModel(City.name)
    private readonly CityModel: Model<City>
  ) {}

  async findOneByTitle(title: string) {
    return this.CityModel.findOne({ title }).exec();
  }

  async create(@Res() res, createCityDto: CreateCityDto) {
    try {
      const createCityModel = await this.CityModel.create(createCityDto);
      return res.status(200).json({
        statusCode: 200,
        message: "یک شهر با موفقیت ایجاد شد",
        data: createCityModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.CityModel.find({});
  }

  async findBasedOnProvince(province: string[]) {
    console.log(province, "province");

    const cities = await this.CityModel.find({
      province_id: province[0],
    });

    return cities;
  }

  findOne(id: string) {
    return this.CityModel.findOne({ _id: id });
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateCityDto: UpdateCityDto
  ) {
    try {
      const City = await this.CityModel.findById(id);

      if (!City) {
        throw new NotFoundException("شهر مورد نظر یافت نشد.");
      }

      const updateCitylModel = await this.CityModel.findByIdAndUpdate(
        id,
        updateCityDto,
        {
          new: true,
        }
      );

      return res.status(200).json({
        statusCode: 200,
        message: "شهر با موفقیت بروزرسانی شد.",
        data: updateCitylModel,
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
      const findOneCity = await this.findOne(id);

      if (findOneCity) {
        const deleteCity = await this.CityModel.deleteOne({
          _id: id,
        });
        if (!deleteCity) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "شهر مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "شهر مورد نظر با موفقیت حذف شد",
          data: deleteCity,
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
