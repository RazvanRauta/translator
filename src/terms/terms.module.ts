import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Term } from './entities/term.entity';
import { TermsService } from './terms.service';

@Module({
	imports: [MikroOrmModule.forFeature([Term])],
	providers: [TermsService],
	exports: [TermsService],
})
export class TermsModule {}
