import { Module } from "@nestjs/common";
import { BookReferenceRepository } from "./book-reference.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { ImageService } from "../../common/services/imageService";
import {
  GradeLevel,
  GradeLevelSchema,
} from "../grade-level/entities/grade-level.entity";
import {
  BookReference,
  BookReferenceSchema,
} from "./entities/book-reference.entity";
import { BookReferenceService } from "./book-reference.service";
import { BookReferenceController } from "./book-reference.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookReference.name, schema: BookReferenceSchema },
      { name: GradeLevel.name, schema: GradeLevelSchema },
    ]),
  ],
  controllers: [BookReferenceController],
  providers: [
    BookReferenceService,
    BookReferenceRepository,
    JwtService,
    ImageService,
  ],
})
export class BookReferenceModule {}
