import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "../../common/services/imageService";

import { BookIntro, BookIntroSchema } from "./entities/book-intro.entity";
import { BookIntroController } from "./book-intro.controller";
import { BookIntroRepository } from "./book-intro.repository";
import { BookIntroService } from "./book-intro.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookIntro.name, schema: BookIntroSchema },
    ]),
  ],
  controllers: [BookIntroController],
  providers: [BookIntroService, BookIntroRepository, JwtService, ImageService],
})
export class BookIntroModule {}
