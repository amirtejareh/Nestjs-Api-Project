import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookRepository } from "./book.repository";

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    createBookDto: CreateBookDto
  ) {
    return this.bookRepository.create(res, file, createBookDto);
  }

  findAll() {
    return this.bookRepository.findAll();
  }

  async findBooksBasedOnGradeLevels(gradeLevels: string[]) {
    return this.bookRepository.findBooksBasedOnGradeLevels(gradeLevels);
  }

  async findBooksBasedOnBookReferences(
    gradeLevels: string[],
    bookReferences: string[]
  ) {
    return this.bookRepository.findBooksBasedOnBookReferences(
      gradeLevels,
      bookReferences
    );
  }

  findOne(id: string) {
    return this.bookRepository.findOne(id);
  }

  update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    id: string,
    updateBookDto: UpdateBookDto
  ) {
    return this.bookRepository.update(res, file, id, updateBookDto);
  }

  remove(@Res() res, id: string) {
    return this.bookRepository.remove(res, id);
  }
}
