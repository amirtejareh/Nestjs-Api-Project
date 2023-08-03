import { Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Section, SectionSchema } from "./entities/section.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
