import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { UpdateBookReferenceDto } from "./dto/update-book-reference.dto";
import { CreateBookReferenceDto } from "./dto/create-book-reference.dto";
import { BookReferenceRepository } from "./book-reference.repository";

@Injectable()
export class BookReferenceService {
  constructor(private bookReferenceRepository: BookReferenceRepository) {}

  create(@Res() res, createBookReferenceDto: CreateBookReferenceDto) {
    return this.bookReferenceRepository.create(res, createBookReferenceDto);
  }

  findAll() {
    return this.bookReferenceRepository.findAll();
  }

  async findBookReferencesBasedOnGradeLevels(gradeLevels: string[]) {
    return this.bookReferenceRepository.findBookReferencesBasedOnGradeLevels(
      gradeLevels
    );
  }

  findOne(id: string) {
    return this.bookReferenceRepository.findOne(id);
  }

  update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    id: string,
    updateBookReferenceDto: UpdateBookReferenceDto
  ) {
    return this.bookReferenceRepository.update(res, id, updateBookReferenceDto);
  }

  remove(@Res() res, id: string) {
    return this.bookReferenceRepository.remove(res, id);
  }
}
