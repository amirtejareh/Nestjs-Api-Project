import { Injectable, Res } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookRepository } from "./book.repository";

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  create(@Res() res, createBookDto: CreateBookDto) {
    return this.bookRepository.create(res, createBookDto);
  }

  findAll() {
    return this.bookRepository.findAll();
  }

  findOne(id: string) {
    return this.bookRepository.findOne(id);
  }

  update(@Res() res, id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(res, id, updateBookDto);
  }

  remove(@Res() res, id: string) {
    return this.bookRepository.remove(res, id);
  }
}
