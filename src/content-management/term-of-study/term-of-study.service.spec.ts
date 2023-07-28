import { Test, TestingModule } from '@nestjs/testing';
import { TermOfStudyService } from './term-of-study.service';

describe('TermOfStudyService', () => {
  let service: TermOfStudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermOfStudyService],
    }).compile();

    service = module.get<TermOfStudyService>(TermOfStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
