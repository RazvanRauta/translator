import { Module } from '@nestjs/common';
import { GlossariesService } from './glossaries.service';
import { GlossariesController } from './glossaries.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Glossary } from './entities/glossary.entity';
import { TermsModule } from '@/terms/terms.module';

@Module({
  imports: [MikroOrmModule.forFeature([Glossary]), TermsModule],
  controllers: [GlossariesController],
  providers: [GlossariesService],
})
export class GlossariesModule {}
