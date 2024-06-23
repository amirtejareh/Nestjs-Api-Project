import { Injectable, Res, UploadedFile } from "@nestjs/common";
import { CreateContentEducationalPricingDto } from "./dto/create-content_educational_pricing.dto";
import { ContentEducationalPricingRepository } from "./content_educational_pricing.repository";
import { UpdateContentEducationalPricingDto } from "./dto/update-content_educational_pricing.dto";

@Injectable()
export class ContentEducationalPricingService {
  constructor(
    private readonly contentEducationalPricingRepository: ContentEducationalPricingRepository
  ) {}

  create(
    @Res() res,
    createContentEducationalPricingDto: CreateContentEducationalPricingDto
  ) {
    return this.contentEducationalPricingRepository.create(
      res,
      createContentEducationalPricingDto
    );
  }

  findAll() {
    return this.contentEducationalPricingRepository.findAll();
  }

  findOne(id: string) {
    return this.contentEducationalPricingRepository.findOne(id);
  }

  update(
    @Res() res,
    id: string,
    updateContentEducationalPricingDto: UpdateContentEducationalPricingDto
  ) {
    return this.contentEducationalPricingRepository.update(
      res,
      id,
      updateContentEducationalPricingDto
    );
  }

  remove(@Res() res, id: string) {
    return this.contentEducationalPricingRepository.remove(res, id);
  }
}
