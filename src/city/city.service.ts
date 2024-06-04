import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { CityRepository } from "./city.repository";

@Injectable()
export class CityService {
  constructor(private cityRepository: CityRepository) {}

  create(@Res() res, createCityDto: CreateCityDto) {
    return this.cityRepository.create(res, createCityDto);
  }

  findAll() {
    return this.cityRepository.findAll();
  }

  async findBasedOnProvince(province: string[]) {
    if (province[0] == "null") {
      return [];
    }

    return this.cityRepository.findBasedOnProvince(province);
  }

  findOne(id: string) {
    return this.cityRepository.findOne(id);
  }

  update(@Res() res, id: string, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update(res, id, updateCityDto);
  }

  remove(@Res() res, id: string) {
    return this.cityRepository.remove(res, id);
  }
}
