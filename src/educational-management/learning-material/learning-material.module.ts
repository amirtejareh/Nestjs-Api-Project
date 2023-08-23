import { Module } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialController } from './learning-material.controller';
import { LearningMaterialRepository } from './learning-material.repository';
import { LearningMaterial, LearningMaterialSchema } from './entities/learning-material.entity';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../../common/services/imageService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningMaterial.name, schema: LearningMaterialSchema },
    ]),
  ],
  controllers: [LearningMaterialController],
  providers: [LearningMaterialService, LearningMaterialRepository, JwtService, ImageService]
})
export class LearningMaterialModule { }
