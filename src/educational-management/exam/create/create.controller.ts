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
import { AuthGuard } from "../../../auth/guards/auth.guard";
import { RoleGuard } from "../../../auth/guards/role.guard";
import { Roles } from "../../../common/decorators/roles.decorator";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { CreateExamService } from "./create.service";
import { CreateCreateExamDto } from "./dto/create-create.dto";

@ApiTags("Create Exam")
@Controller("create-exam")
export class CreateExamController {
  constructor(private readonly createExamService: CreateExamService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createCreateExamDto: CreateCreateExamDto) {
    return this.createExamService.create(res, createCreateExamDto);
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.createExamService.findAll(page, limit);
  }

  @Get("withBooks/:BookId")
  async findCreateExamsBasedOnBooks(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") books: string
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.createExamService.findCreateExamsBasedOnBooks(
      page,
      limit,
      books
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.createExamService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    return this.createExamService.update(res, id, updateCreateExamDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.createExamService.remove(res, id);
  }
}
