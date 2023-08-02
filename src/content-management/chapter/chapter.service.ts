import { Body, Injectable, Param, Res } from "@nestjs/common";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { ChapterRepository } from "./chapter.repository";

@Injectable()
export class ChapterService {
  constructor(private readonly chapterRepository: ChapterRepository) {}

  create(@Res() res, @Body() createChapterDto: CreateChapterDto) {
    return this.chapterRepository.create(res, createChapterDto);
  }

  findAll() {
    return this.chapterRepository.findAll();
  }

  findOne(@Param("id") id: string) {
    return this.chapterRepository.findOne(id);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateChapterDto: UpdateChapterDto
  ) {
    return this.chapterRepository.update(res, id, updateChapterDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.chapterRepository.remove(res, id);
  }
}
