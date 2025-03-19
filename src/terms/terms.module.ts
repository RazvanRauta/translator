import { Module } from '@nestjs/common';
import { TermsService } from './terms.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Term } from './entities/term.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Term])],
  providers: [TermsService],
  exports: [TermsService],
})
export class TermsModule {}
