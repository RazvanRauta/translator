import { Glossary } from '@/glossaries/entities/glossary.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { Term } from './entities/term.entity';

@Injectable()
export class TermsService {
  constructor(private readonly em: EntityManager) {}

  async create(createTermDto: CreateTermDto, glossary: Glossary) {
    const term = this.em.create(Term, {
      ...createTermDto,
      glossary,
    });
    await this.em.persistAndFlush(term);
    return term.toJSON();
  }
}
