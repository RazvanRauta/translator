import { mikro } from '@automapper/mikro';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { TermProfile } from '@/terms/mapper/term.profile';

import { BaseProfile } from './base.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: mikro(),
    }),
  ],
  providers: [BaseProfile, TermProfile],
  exports: [BaseProfile, TermProfile],
})
export class MapperModule {}
