import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import {
  ContentEducationalPricing,
  ContentEducationalPricingSchema,
} from "./entities/content_educational_pricing.controller.entity";
import { ContentEducationalPricingController } from "./content_educational_pricing.controller";
import { ContentEducationalPricingService } from "./content_educational_pricing.service";
import { ContentEducationalPricingRepository } from "./content_educational_pricing.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContentEducationalPricing.name,
        schema: ContentEducationalPricingSchema,
      },
    ]),
  ],
  controllers: [ContentEducationalPricingController],
  providers: [
    ContentEducationalPricingService,
    ContentEducationalPricingRepository,
    JwtService,
    ImageService,
  ],
})
export class ContentEducationalPricingModule {}
