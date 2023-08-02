import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BookRepository } from "./book.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./entities/book.entity";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";
import {
  GradeLevel,
  GradeLevelSchema,
} from "../grade-level/entities/grade-level.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: GradeLevel.name, schema: GradeLevelSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, JwtService, ImageService],
})
export class BookModule {}
