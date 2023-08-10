import { Body, Injectable, Param, ParseArrayPipe, Res } from "@nestjs/common";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { SectionRepository } from "./section.repository";

@Injectable()
export class SectionService {
  sectionService: any;
  constructor(private readonly sectionRepository: SectionRepository) {}

  create(@Res() res, @Body() createSectionDto: CreateSectionDto) {
    return this.sectionRepository.create(res, createSectionDto);
  }

  findAll() {
    return this.sectionRepository.findAll();
  }

  findOne(@Param("id") id: string) {
    return this.sectionRepository.findOne(id);
  }

  async findSectionsBasedOnChapters(chapters: string[]) {
    return this.sectionRepository.findSectionsBasedOnChapters(chapters);
  }

  update(
    @Res() res,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ) {
    return this.sectionRepository.update(res, id, updateSectionDto);
  }

  remove(@Res() res, @Param("id") id: string) {
    return this.sectionRepository.remove(res, id);
  }
}
