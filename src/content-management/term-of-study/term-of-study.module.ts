import { Module } from "@nestjs/common";
import { TermOfStudyService } from "./term-of-study.service";
import { TermOfStudyController } from "./term-of-study.controller";
import { JwtService } from "@nestjs/jwt";
import { TermOfStudyRepository } from "./term-of-study.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { TermOfStudySchema } from "./entities/term-of-study.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "termOfStudy", schema: TermOfStudySchema },
    ]),
  ],
  controllers: [TermOfStudyController],
  providers: [TermOfStudyService, TermOfStudyRepository, JwtService],
})
export class TermOfStudyModule {}
