import { Module } from "@nestjs/common";
import { FieldOfStudyService } from "./field-of-study.service";
import { FieldOfStudyController } from "./field-of-study.controller";
import { FieldOfStudyRepository } from "./field-of-study.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { FieldOfStudySchema } from "./entities/field-of-study.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "fieldOfStudy", schema: FieldOfStudySchema },
    ]),
  ],
  controllers: [FieldOfStudyController],
  providers: [FieldOfStudyService, FieldOfStudyRepository, JwtService],
})
export class FieldOfStudyModule {}
