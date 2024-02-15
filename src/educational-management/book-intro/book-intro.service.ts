import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { BookIntroRepository } from "./book-intro.repository";
import { CreateBookIntroDto } from "./dto/create-book-intro.dto";
import { UpdateBookIntroDto } from "./dto/update-book-intro.dto";

@Injectable()
export class BookIntroService {
  constructor(private readonly bookIntroRepository: BookIntroRepository) {}

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createBookIntroDto: CreateBookIntroDto
  ) {
    return this.bookIntroRepository.create(res, pdfFiles, createBookIntroDto);
  }

  findAll() {
    return this.bookIntroRepository.findAll();
  }

  findOne(id: string) {
    return this.bookIntroRepository.findOne(id);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateBookIntroDto: UpdateBookIntroDto
  ) {
    return this.bookIntroRepository.update(
      res,
      pdfFiles,
      id,
      updateBookIntroDto
    );
  }

  remove(@Res() res, id: string) {
    return this.bookIntroRepository.remove(res, id);
  }
}
