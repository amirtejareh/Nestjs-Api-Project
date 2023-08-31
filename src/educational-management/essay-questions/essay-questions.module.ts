import { Module } from '@nestjs/common';
import { EssayQuestionService } from './essay-questions.service';
import { EssayQuestionController } from './essay-questions.controller';
import { EssayQuestionRepository } from './essay-questions.repository';
import { EssayQuestion, EssayQuestionSchema } from './entities/essay-questions.entity';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../../common/services/imageService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EssayQuestion.name, schema: EssayQuestionSchema },
    ]),
  ],
  controllers: [EssayQuestionController],
  providers: [EssayQuestionService, EssayQuestionRepository, JwtService, ImageService]
})
export class EssayQuestionModule { }
