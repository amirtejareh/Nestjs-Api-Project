import { Module } from "@nestjs/common";
import { SampleTestQuestionsService } from "./sample-test-questions.service";
import { SampleTestQuestionsController } from "./sample-test-questions.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  SampleTestQuestions,
  SampleTestQuestionsSchema,
} from "./entities/sample-test-question.entity";
import { SampleTestQuestionsRepository } from "./sample-test-questions.repository";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SampleTestQuestions.name,
        schema: SampleTestQuestionsSchema,
      },
    ]),
  ],
  controllers: [SampleTestQuestionsController],
  providers: [
    SampleTestQuestionsService,
    SampleTestQuestionsRepository,
    JwtService,
    ImageService,
  ],
})
export class SampleTestQuestionsModule {}
