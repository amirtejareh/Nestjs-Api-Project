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
import {
  FirstQuestion,
  FirstQuestionSchema,
} from "../comprehensive-first-question/entities/first-question.entity";
import {
  SecondQuestion,
  SecondQuestionSchema,
} from "../comprehensive-second-question/entities/second-question.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrimaryQuestion.name, schema: PrimaryQuestionSchema },
      { name: FirstQuestion.name, schema: FirstQuestionSchema },
      { name: SecondQuestion.name, schema: SecondQuestionSchema },
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
