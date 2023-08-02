import { Module } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { ChapterController } from "./chapter.controller";
import { ChapterRepository } from "./chapter.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Chapter, ChapterSchema } from "./entities/chapter.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository, JwtService],
})
export class ChapterModule {}
