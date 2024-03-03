import { Module } from "@nestjs/common";
import { CreateExamController } from "./create.controller";
import { CreateExamService } from "./create.service";
import { ImageService } from "../../../common/services/imageService";
import { JwtService } from "@nestjs/jwt";
import { CreateExamRepository } from "./create.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { CreateExam, CreateExamSchema } from "./entities/create.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CreateExam.name,
        schema: CreateExamSchema,
      },
    ]),
  ],
  controllers: [CreateExamController],
  providers: [
    CreateExamService,
    CreateExamRepository,
    JwtService,
    ImageService,
  ],
})
export class CreateExamModule {}
