import { mikro } from '@automapper/mikro';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { GlossaryProfile } from '@/glossaries/mapper/glossary.profile';
import { LangCodeProfile } from '@/lang-codes/mapper/lang-code.profile';
import { TermProfile } from '@/terms/mapper/term.profile';

import { BaseProfile } from './base.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: mikro(),
    }),
  ],
  providers: [BaseProfile, TermProfile, LangCodeProfile, GlossaryProfile],
  exports: [BaseProfile, TermProfile, LangCodeProfile, GlossaryProfile],
})
export class MapperModule {}
