import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { StandardService } from "./standard.service";
import { AuthGuard } from "../../../auth/guards/auth.guard";
import { RoleGuard } from "../../../auth/guards/role.guard";
import { Roles } from "../../../common/decorators/roles.decorator";
import { CreateStandardDto } from "./dto/create-standard.dto";
import { UpdateStandardDto } from "./dto/update-standard.dto";

@ApiTags("Standard")
@Controller("standard")
export class StandardController {
  constructor(private readonly standardService: StandardService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createStandardDto: CreateStandardDto) {
    return this.standardService.create(res, createStandardDto);
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.standardService.findAll(page, limit);
  }

  @Get("withBooks/:BookId")
  async findStandardsBasedOnBooks(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") books: string
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.standardService.findStandardsBasedOnBooks(page, limit, books);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.standardService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateStandardDto: UpdateStandardDto
  ) {
    return this.standardService.update(res, id, updateStandardDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.standardService.remove(res, id);
  }
}
