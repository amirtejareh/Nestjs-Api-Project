import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Res,
  UploadedFiles,
  UploadedFile,
} from "@nestjs/common";

import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../common/decorators/roles.decorator";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { AnswersheetManagementService } from "./answersheet-management.service";
import { CreateAnswersheetManagementDto } from "./dto/create-answersheet-management.dto";
import { UpdateAnswersheetManagementDto } from "./dto/update-answersheet-management.dto";

@ApiTags("Answersheet Management")
@Controller("answersheet-management")
export class AnswersheetManagementController {
  constructor(
    private readonly answersheetManagementService: AnswersheetManagementService
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles("SuperAdmin")
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],

    @Body() createAnswersheetManagementDto: CreateAnswersheetManagementDto
  ) {
    return this.answersheetManagementService.create(
      res,
      AnswerSheetSourcePdfFile,
      createAnswersheetManagementDto
    );
  }

  @Get()
  findAll() {
    return this.answersheetManagementService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.answersheetManagementService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Res() res,
    @UploadedFiles() pdfFiles: Array<Express.Multer.File>,
    @Param("id") id: string,
    @Body() updateAnswersheetManagementDto: UpdateAnswersheetManagementDto
  ) {
    return this.answersheetManagementService.update(
      res,
      pdfFiles,
      id,
      updateAnswersheetManagementDto
    );
  }

  @Delete(":id")
  remove(@Res() res, @Param("id") id: string) {
    return this.answersheetManagementService.remove(res, id);
  }
}
