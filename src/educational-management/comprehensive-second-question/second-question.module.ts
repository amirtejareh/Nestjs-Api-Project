import { Module } from "@nestjs/common";
import { SecondQuestionController } from "./second-question.controller";
import {
  SecondQuestion,
  SecondQuestionSchema,
} from "./entities/second-question.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import { SecondQuestionService } from "./second-question.service";
import { SecondQuestionRepository } from "./second-question.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecondQuestion.name, schema: SecondQuestionSchema },
    ]),
  ],
  controllers: [SecondQuestionController],
  providers: [
    SecondQuestionService,
    SecondQuestionRepository,
    JwtService,
    ImageService,
  ],
})
export class SecondQuestionModule {}
