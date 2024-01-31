import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateTipAndTestDto } from "./dto/create-tip-and-test.dto";
import { UpdateTipAndTestDto } from "./dto/update-tip-and-test.dto";
import { TipAndTestRepository } from "./tip-and-test.repository";

@Injectable()
export class TipAndTestService {
  constructor(private readonly tipAndTestRepository: TipAndTestRepository) {}

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createTipAndTestDto: CreateTipAndTestDto
  ) {
    return this.tipAndTestRepository.create(res, pdfFiles, createTipAndTestDto);
  }

  findAll() {
    return this.tipAndTestRepository.findAll();
  }

  findOne(id: string) {
    return this.tipAndTestRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.tipAndTestRepository.findBasedOnSubjects(subjects);
  }

  async findBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.tipAndTestRepository.findBasedOnBooks(books);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateTipAndTestDto: UpdateTipAndTestDto
  ) {
    return this.tipAndTestRepository.update(
      res,
      pdfFiles,
      id,
      updateTipAndTestDto
    );
  }

  remove(@Res() res, id: string) {
    return this.tipAndTestRepository.remove(res, id);
  }
}
