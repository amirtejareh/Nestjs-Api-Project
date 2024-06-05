import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { NewsRepository } from "./news.repository";

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  create(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    createNewsDto: CreateNewsDto
  ) {
    return this.newsRepository.create(res, file, createNewsDto);
  }

  findAll() {
    return this.newsRepository.findAll();
  }

  findOne(id: string) {
    return this.newsRepository.findOne(id);
  }

  update(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    id: string,
    updateNewsDto: UpdateNewsDto
  ) {
    return this.newsRepository.update(res, file, id, updateNewsDto);
  }

  remove(@Res() res, id: string) {
    return this.newsRepository.remove(res, id);
  }
}
