import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Translation } from './entities/translation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Translation])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}
