import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseArrayPipe,
} from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("City")
@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Res() res, @Body() createCityDto: CreateCityDto) {
    return this.cityService.create(res, createCityDto);
  }

  @Get("withProvinces/:provinceId")
  async findCitiesBasedOnProvince(
    @Param("provinceId", ParseArrayPipe) provinces: string[]
  ) {
    if (provinces[0] == "null") {
      return [];
    }

    return this.cityService.findBasedOnProvince(provinces);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cityService.findOne(id);
  }

  @Patch(":id")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateCityDto: UpdateCityDto
  ) {
    return this.cityService.update(res, id, updateCityDto);
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.cityService.remove(res, id);
  }
}
