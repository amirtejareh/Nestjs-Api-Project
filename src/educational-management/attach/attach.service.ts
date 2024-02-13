import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateAttachDto } from "./dto/create-attach.dto";
import { UpdateAttachDto } from "./dto/update-attach.dto";
import { AttachRepository } from "./attach.repository";

@Injectable()
export class AttachService {
  constructor(private readonly attachRepository: AttachRepository) {}

  create(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    createAttachDto: CreateAttachDto
  ) {
    return this.attachRepository.create(res, pdfFiles, createAttachDto);
  }

  findAll() {
    return this.attachRepository.findAll();
  }

  findOne(id: string) {
    return this.attachRepository.findOne(id);
  }

  async findBasedOnChapters(chapters: string[]) {
    return this.attachRepository.findBasedOnChapters(chapters);
  }

  async findBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.attachRepository.findBasedOnBooks(books);
  }

  update(
    @Res() res,
    @UploadedFile() pdfFiles: Express.Multer.File[],
    id: string,
    updateAttachDto: UpdateAttachDto
  ) {
    return this.attachRepository.update(res, pdfFiles, id, updateAttachDto);
  }

  remove(@Res() res, id: string) {
    return this.attachRepository.remove(res, id);
  }
}
