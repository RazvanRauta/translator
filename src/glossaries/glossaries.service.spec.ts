import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesService } from './glossaries.service';

describe('GlossariesService', () => {
  let service: GlossariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossariesService],
    }).compile();

    service = module.get<GlossariesService>(GlossariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
