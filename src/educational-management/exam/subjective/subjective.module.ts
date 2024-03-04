import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../../common/services/imageService";
import { Subjective, SubjectiveSchema } from "./entities/subjective.entity";
import { SubjectiveController } from "./subjective.controller";
import { SubjectiveService } from "./subjective.service";
import { SubjectiveRepository } from "./subjective.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subjective.name,
        schema: SubjectiveSchema,
      },
    ]),
  ],
  controllers: [SubjectiveController],
  providers: [
    SubjectiveService,
    JwtService,
    ImageService,
    SubjectiveRepository,
  ],
})
export class SubjectiveModule {}
