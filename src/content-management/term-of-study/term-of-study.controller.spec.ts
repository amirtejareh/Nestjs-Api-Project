import { Test, TestingModule } from '@nestjs/testing';
import { TermOfStudyController } from './term-of-study.controller';
import { TermOfStudyService } from './term-of-study.service';

describe('TermOfStudyController', () => {
  let controller: TermOfStudyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermOfStudyController],
      providers: [TermOfStudyService],
    }).compile();

    controller = module.get<TermOfStudyController>(TermOfStudyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
