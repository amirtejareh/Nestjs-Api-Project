import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateComprehensiveTestDto } from "./dto/create-comprehensive-test.dto";
import { UpdateComprehensiveTestDto } from "./dto/update-comprehensive-test.dto";
import { ComprehensiveTestRepository } from "./comprehensive-test.repository";

@Injectable()
export class ComprehensiveTestService {
  constructor(
    private readonly comprehensiveTestRepository: ComprehensiveTestRepository
  ) {}

  create(@Res() res, createComprehensiveTestDto: CreateComprehensiveTestDto) {
    return this.comprehensiveTestRepository.create(
      res,
      createComprehensiveTestDto
    );
  }

  findAll() {
    return this.comprehensiveTestRepository.findAll();
  }

  findOne(id: string) {
    return this.comprehensiveTestRepository.findOne(id);
  }

  async findBasedOnChapters(chapters: string[]) {
    if (chapters[0] == "null") {
      return [];
    }

    return this.comprehensiveTestRepository.findBasedOnChapters(chapters);
  }

  async findComprehensiveTestBasedOnBooks(books: string[]) {
    if (books[0] == "null") {
      return [];
    }

    return this.comprehensiveTestRepository.findComprehensiveTestBasedOnBooks(
      books
    );
  }

  update(
    @Res() res,
    id: string,
    updateComprehensiveTestDto: UpdateComprehensiveTestDto
  ) {
    return this.comprehensiveTestRepository.update(
      res,
      id,
      updateComprehensiveTestDto
    );
  }

  remove(@Res() res, id: string) {
    return this.comprehensiveTestRepository.remove(res, id);
  }
}
