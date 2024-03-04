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
import { SubjectiveService } from "./subjective.service";
import { CreateSubjectiveDto } from "./dto/create-subjective.dto";
import { UpdateSubjectiveDto } from "./dto/update-subjective.dto";

@ApiTags("Subjective")
@Controller("subjective")
export class SubjectiveController {
  constructor(private readonly subjectiveService: SubjectiveService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  create(@Res() res, @Body() createSubjectiveDto: CreateSubjectiveDto) {
    return this.subjectiveService.create(res, createSubjectiveDto);
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.subjectiveService.findAll(page, limit);
  }

  @Get("withBooks/:BookId")
  async findSubjectivesBasedOnBooks(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") books: string
  ) {
    if (books[0] == "null") {
      return [];
    }

    return this.subjectiveService.findSubjectivesBasedOnBooks(
      page,
      limit,
      books
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subjectiveService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSubjectiveDto: UpdateSubjectiveDto
  ) {
    return this.subjectiveService.update(res, id, updateSubjectiveDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.subjectiveService.remove(res, id);
  }
}
