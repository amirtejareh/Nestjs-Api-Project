import { Injectable, Res, UploadedFile } from '@nestjs/common';
import { BookExercisesRepository } from './book-exercises.repository';
import { CreateBookExercisesDto } from './dto/create-book-exercises.dto';
import { UpdateBookExercisesDto } from './dto/update-book-exercises.dto';

@Injectable()
export class BookExercisesService {
  constructor(private readonly bookExercisesRepository: BookExercisesRepository) { }

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createBookExercisesDto: CreateBookExercisesDto
  ) {

    return this.bookExercisesRepository.create(res, pdfFiles, createBookExercisesDto);
  }

  findAll() {
    return this.bookExercisesRepository.findAll();
  }

  findOne(id: string) {
    return this.bookExercisesRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.bookExercisesRepository.findBasedOnSubjects(subjects);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateBookExercisesDto: UpdateBookExercisesDto
  ) {
    return this.bookExercisesRepository.update(res, pdfFiles, id, updateBookExercisesDto);
  }

  remove(@Res() res, id: string) {
    return this.bookExercisesRepository.remove(res, id);
  }
}
