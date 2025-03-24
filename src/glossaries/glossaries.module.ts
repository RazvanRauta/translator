import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TermsModule } from '@/terms/terms.module';

import { Glossary } from './entities/glossary.entity';
import { GlossariesController } from './glossaries.controller';
import { GlossariesService } from './glossaries.service';

@Module({
	imports: [MikroOrmModule.forFeature([Glossary]), TermsModule],
	controllers: [GlossariesController],
	providers: [GlossariesService],
})
export class GlossariesModule {}
