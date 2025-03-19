import { Test, TestingModule } from '@nestjs/testing';
import { GlossariesController } from './glossaries.controller';
import { GlossariesService } from './glossaries.service';

describe('GlossariesController', () => {
  let controller: GlossariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlossariesController],
      providers: [GlossariesService],
    }).compile();

    controller = module.get<GlossariesController>(GlossariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
