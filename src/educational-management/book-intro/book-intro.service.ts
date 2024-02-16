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

  async findBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.bookIntroRepository.findBasedOnBooks(books);
  }

  async findBasedOnBooksAndType(books: string[], type: string) {
    if (books[0] == "null" || type == "") {
      return [];
    }

    return this.bookIntroRepository.findBasedOnBooksAndType(books, type);
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
