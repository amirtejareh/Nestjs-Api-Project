import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { NewsRepository } from "./news.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { News, NewsSchema } from "./entities/news.entity";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";
import {
  GradeLevel,
  GradeLevelSchema,
} from "../grade-level/entities/grade-level.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: GradeLevel.name, schema: GradeLevelSchema },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, JwtService, ImageService],
})
export class NewsModule {}
