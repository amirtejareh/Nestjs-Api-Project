import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { ProvinceRepository } from "./province.repository";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { CreateProvinceDto } from "./dto/create-province.dto";

@Injectable()
export class ProvinceService {
  constructor(private provinceRepository: ProvinceRepository) {}

  create(@Res() res, createProvinceDto: CreateProvinceDto) {
    return this.provinceRepository.create(res, createProvinceDto);
  }

  findAll() {
    return this.provinceRepository.findAll();
  }

  findOne(id: string) {
    return this.provinceRepository.findOne(id);
  }

  update(@Res() res, id: string, updateProvinceDto: UpdateProvinceDto) {
    return this.provinceRepository.update(res, id, updateProvinceDto);
  }

  remove(@Res() res, id: string) {
    return this.provinceRepository.remove(res, id);
  }
}
