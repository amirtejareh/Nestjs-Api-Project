import { Module } from '@nestjs/common';
import { TermOfStudyService } from './term-of-study.service';
import { TermOfStudyController } from './term-of-study.controller';

@Module({
  controllers: [TermOfStudyController],
  providers: [TermOfStudyService]
})
export class TermOfStudyModule {}
