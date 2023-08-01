import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BookRepository } from "./book.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { BookSchema } from "./entities/book.entity";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";

@Module({
  imports: [MongooseModule.forFeature([{ name: "book", schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookRepository, JwtService, ImageService],
})
export class BookModule {}
