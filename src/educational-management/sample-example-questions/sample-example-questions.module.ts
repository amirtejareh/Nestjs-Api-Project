import { Module } from "@nestjs/common";
import { SampleExampleQuestionsService } from "./sample-example-questions.service";
import { SampleExampleQuestionsController } from "./sample-example-questions.controller";
import { SampleExampleQuestionsRepository } from "./sample-example-questions.repository";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";
import { MongooseModule } from "@nestjs/mongoose";
import {
  SampleExampleQuestions,
  SampleExampleQuestionsSchema,
} from "./entities/sample-example-question.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SampleExampleQuestions.name,
        schema: SampleExampleQuestionsSchema,
      },
    ]),
  ],
  controllers: [SampleExampleQuestionsController],
  providers: [
    SampleExampleQuestionsService,
    SampleExampleQuestionsRepository,
    JwtService,
    ImageService,
  ],
})
export class SampleExampleQuestionsModule {}
