import { Module } from "@nestjs/common";
import { PrimaryQuestionController } from "./primary-question.controller";
import { PrimaryQuestionRepository } from "./primary-question.repository";
import {
  PrimaryQuestion,
  PrimaryQuestionSchema,
} from "./entities/primary-question.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";
import { PrimaryQuestionService } from "./primary-question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrimaryQuestion.name, schema: PrimaryQuestionSchema },
    ]),
  ],
  controllers: [PrimaryQuestionController],
  providers: [
    PrimaryQuestionService,
    PrimaryQuestionRepository,
    JwtService,
    ImageService,
  ],
})
export class PrimaryQuestionModule {}
