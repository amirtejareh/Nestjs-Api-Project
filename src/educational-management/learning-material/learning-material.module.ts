import { Module } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialController } from './learning-material.controller';
import { LearningMaterialRepository } from './learning-material.repository';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [LearningMaterialController],
  providers: [LearningMaterialService, LearningMaterialRepository, JwtService]
})
export class LearningMaterialModule { }
