import { Module } from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelController } from './grade-level.controller';

@Module({
  controllers: [GradeLevelController],
  providers: [GradeLevelService]
})
export class GradeLevelModule {}
