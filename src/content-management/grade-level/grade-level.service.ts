import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateGradeLevelDto } from "./dto/create-grade-level.dto";
import { UpdateGradeLevelDto } from "./dto/update-grade-level.dto";
import { GradeLevelRepository } from "./grade-level.repository";

@Injectable()
export class GradeLevelService {
  constructor(private gradeLevelRepository: GradeLevelRepository) {}

  create(
    @Res() res,
    @UploadedFile() file,
    createGradeLevelDto: CreateGradeLevelDto
  ) {
    return this.gradeLevelRepository.create(res, file, createGradeLevelDto);
  }

  findAll() {
    return this.gradeLevelRepository.findAll();
  }

  findOne(id: string) {
    return this.gradeLevelRepository.findOne(id);
  }

  update(@Res() res, id: string, updateGradeLevelDto: UpdateGradeLevelDto) {
    return this.gradeLevelRepository.update(res, id, updateGradeLevelDto);
  }

  remove(@Res() res, id: string) {
    return this.gradeLevelRepository.remove(res, id);
  }
}
