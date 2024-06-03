import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { ProvinceService } from "./province.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Controller("province")
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  create(@Res() res, @Body() createProvinceDto: CreateProvinceDto) {
    return this.provinceService.create(res, createProvinceDto);
  }

  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.provinceService.findOne(id);
  }

  @Patch(":id")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateProvinceDto: UpdateProvinceDto
  ) {
    return this.provinceService.update(res, id, updateProvinceDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.provinceService.remove(res, id);
  }
}
