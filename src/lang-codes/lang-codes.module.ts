import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { LanguageCode } from './entities/lang-code.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [LanguageCode],
    }),
  ],
})
export class LangCodesModule {}
