import { Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Section, SectionSchema } from "./entities/section.entity";
import { SectionRepository } from "./section.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  controllers: [SectionController],
  providers: [SectionService, SectionRepository, JwtService],
})
export class SectionModule {}
