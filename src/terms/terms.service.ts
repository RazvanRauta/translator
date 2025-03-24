import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Glossary } from '@/glossaries/entities/glossary.entity';

import { CreateTermDto } from './dto/create-term.dto';
import { TermDto } from './dto/term.dto';
import { Term } from './entities/term.entity';

@Injectable()
export class TermsService {
	constructor(
		private readonly em: EntityManager,
		@InjectMapper() private mapper: Mapper,
	) {}

	async create(createTermDto: CreateTermDto, glossary: Glossary) {
		const term = this.em.create(Term, {
			...createTermDto,
			glossary,
		});
		await this.em.persistAndFlush(term);
		return this.mapper.map(term, Term, TermDto);
	}
}
