import { Injectable, Res, UploadedFile } from '@nestjs/common';
import { KaranbalaRepository } from './karanbala.repository';
import { CreateKaranbalaDto } from './dto/create-karanbala.dto';
import { UpdateKaranbalaDto } from './dto/update-karanbala.dto';

@Injectable()
export class KaranbalaService {
  constructor(private readonly karanbalaRepository: KaranbalaRepository) { }

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createKaranbalaDto: CreateKaranbalaDto
  ) {

    return this.karanbalaRepository.create(res, pdfFiles, createKaranbalaDto);
  }

  findAll() {
    return this.karanbalaRepository.findAll();
  }

  findOne(id: string) {
    return this.karanbalaRepository.findOne(id);
  }

  async findBasedOnSubjects(subjects: string[]) {
    return this.karanbalaRepository.findBasedOnSubjects(subjects);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateKaranbalaDto: UpdateKaranbalaDto
  ) {
    return this.karanbalaRepository.update(res, pdfFiles, id, updateKaranbalaDto);
  }

  remove(@Res() res, id: string) {
    return this.karanbalaRepository.remove(res, id);
  }
}
