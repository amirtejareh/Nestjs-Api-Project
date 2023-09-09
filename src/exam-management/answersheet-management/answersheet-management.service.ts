import { Injectable, Res, UploadedFile, UploadedFiles } from "@nestjs/common";
import { AnswersheetManagementRepository } from "./answersheet-management.repository";
import { CreateAnswersheetManagementDto } from "./dto/create-answersheet-management.dto";
import { UpdateAnswersheetManagementDto } from "./dto/update-answersheet-management.dto";

@Injectable()
export class AnswersheetManagementService {
  constructor(
    private readonly answersheetManagementRepository: AnswersheetManagementRepository
  ) {}

  create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    createAnswersheetManagementDto: CreateAnswersheetManagementDto
  ) {
    return this.answersheetManagementRepository.create(
      res,
      AnswerSheetSourcePdfFile,
      createAnswersheetManagementDto
    );
  }

  findAll() {
    return this.answersheetManagementRepository.findAll();
  }

  findOne(id: string) {
    return this.answersheetManagementRepository.findOne(id);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateAnswersheetManagementDto: UpdateAnswersheetManagementDto
  ) {
    return this.answersheetManagementRepository.update(
      res,
      pdfFiles,
      id,
      updateAnswersheetManagementDto
    );
  }

  remove(@Res() res, id: string) {
    return this.answersheetManagementRepository.remove(res, id);
  }
}
