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
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../../auth/guards/auth.guard";
import { RoleGuard } from "../../../auth/guards/role.guard";
import { Roles } from "../../../common/decorators/roles.decorator";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { CreateExamService } from "./create.service";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@ApiTags("Create Exam")
@Controller("create-exam")
export class CreateExamController {
  constructor(private readonly createExamService: CreateExamService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() createCreateExamDto: CreateCreateExamDto
  ) {
    return this.createExamService.create(
      res,
      AnswerSheetSourcePdfFile,
      createCreateExamDto
    );
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.createExamService.findAll(page, limit);
  }

  @Get("withStandardExam")
  async findAllCreateExamsBasedOnStandardExam() {
    return this.createExamService.findAllCreateExamsBasedOnStandardExam();
  }

  @Get("withSubjectiveExam")
  async findAllCreateExamsBasedOnSubjectiveExam() {
    return this.createExamService.findAllCreateExamsBasedOnSubjectiveExam();
  }

  @Get("withBooks/:BookId")
  async findCreateExamsBasedOnBooks(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("BookId") books: string
  ) {
    if (books == "") {
      return [];
    }

    return this.createExamService.findCreateExamsBasedOnBooks(
      page,
      limit,
      books
    );
  }

  @Get("standard/withChapters/:ChapterId/withExamType/:ExamTypeId")
  async findCreateStandardExamsBasedOnChaptersAndExamTypes(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("ChapterId") chapters: string,
    @Query("ExamTypeId") types: string
  ) {
    if (chapters == "") {
      return [];
    }

    return this.createExamService.findCreateStandardExamsBasedOnChaptersAndExamTypes(
      page,
      limit,
      chapters,
      types
    );
  }

  @Get("standard/withTerms/:TermId/withExamType/:ExamTypeId")
  async findCreateStandardExamsBasedOnTermsAndExamTypes(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("TermId") terms: string,
    @Query("ExamTypeId") types: string
  ) {
    if (terms == "") {
      return [];
    }

    return this.createExamService.findCreateStandardExamsBasedOnTermsAndExamTypes(
      page,
      limit,
      terms,
      types
    );
  }

  @Get("standard/withChapters/:ChapterId")
  async findCreateStandardExamsBasedOnChapters(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("ChapterId") chapters: string
  ) {
    if (chapters == "") {
      return [];
    }

    return this.createExamService.findCreateStandardExamsBasedOnChapters(
      page,
      limit,
      chapters
    );
  }

  @Get("standard/withTerms/:TermId")
  async findCreateStandardExamsBasedOnTerms(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("TermId") terms: string
  ) {
    if (terms == "") {
      return [];
    }

    return this.createExamService.findCreateStandardExamsBasedOnTerms(
      page,
      limit,
      terms
    );
  }

  @Get("subjective/withSubject/:SubjectId")
  async findCreateSubjectiveExamsBasedOnSubjects(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("SubjectId") subjects: string
  ) {
    if (subjects == "") {
      return [];
    }

    return this.createExamService.findCreateSubjectiveExamsBasedOnSubjects(
      page,
      limit,
      subjects
    );
  }

  @Get(
    "subjective/withSubject/:SubjectId/withExamLevel/:ExamLevelId/:withExamType/:ExamTypeId"
  )
  async findCreateSubjectiveExamsBasedOnSubjectsExamLevelAndExamType(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("SubjectId") subjects: string,
    @Query("ExamLevelId") examLevel: string,
    @Query("ExamTypeId") examType: string
  ) {
    if (subjects == "") {
      return [];
    }

    if (examLevel == "") {
      return [];
    }

    if (examType == "") {
      return [];
    }

    return this.createExamService.findCreateSubjectiveExamsBasedOnSubjectsExamLevelAndExamType(
      page,
      limit,
      subjects,
      examLevel,
      examType
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Param("id") id: string,
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    return this.createExamService.update(
      res,
      id,
      AnswerSheetSourcePdfFile,
      updateCreateExamDto
    );
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  remove(@Res() res, @Param("id") id: string) {
    return this.createExamService.remove(res, id);
  }
}
