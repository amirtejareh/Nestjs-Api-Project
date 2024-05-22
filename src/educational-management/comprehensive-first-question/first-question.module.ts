import { Module } from "@nestjs/common";
import { FirstQuestionController } from "./first-question.controller";
import {
  FirstQuestion,
  FirstQuestionSchema,
} from "./entities/first-question.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import { FirstQuestionService } from "./first-question.service";
import { FirstQuestionRepository } from "./first-question.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirstQuestion.name, schema: FirstQuestionSchema },
    ]),
  ],
  controllers: [FirstQuestionController],
  providers: [
    FirstQuestionService,
    FirstQuestionRepository,
    JwtService,
    ImageService,
  ],
})
export class FirstQuestionModule {}
