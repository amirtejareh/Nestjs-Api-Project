import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../../common/services/imageService';
import { BookExercisesController } from './book-exercises.controller';
import { BookExercisesService } from './book-exercises.service';
import { BookExercisesRepository } from './book-exercises.repository';
import { BookExercises, BookExercisesSchema } from './entities/book-exercises.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookExercises.name, schema: BookExercisesSchema },
    ]),
  ],
  controllers: [BookExercisesController],
  providers: [BookExercisesService, BookExercisesRepository, JwtService, ImageService]
})
export class BookExercisesModule { }
