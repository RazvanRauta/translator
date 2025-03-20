import { EntityManager } from '@mikro-orm/postgresql';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';
import { CreateTermDto } from '@/terms/dto/create-term.dto';
import { TermsService } from '@/terms/terms.service';

import { CreateGlossaryDto } from './dto/create-glossary.dto';
import { Glossary } from './entities/glossary.entity';

@Injectable()
export class GlossariesService {
  constructor(
    private readonly em: EntityManager,
    private readonly termsService: TermsService,
  ) {}

  async create(createGlossaryDto: CreateGlossaryDto) {
    const { sourceLanguageCode, targetLanguageCode } = createGlossaryDto;

    const sourceLanguage = await this.em.findOne(LanguageCode, {
      code: sourceLanguageCode,
    });

    if (!sourceLanguage) {
      throw new NotFoundException('Source language code does not exist');
    }

    const targetLanguage = await this.em.findOne(LanguageCode, {
      code: targetLanguageCode,
    });

    if (!targetLanguage) {
      throw new NotFoundException('Target language code does not exist');
    }

    const existingGlossary = await this.em.findOne(Glossary, {
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    });

    if (existingGlossary) {
      throw new ConflictException(
        'Glossary already exists for these language codes',
      );
    }

    const glossary = this.em.create(Glossary, {
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    });
    await this.em.persistAndFlush(glossary);
    return glossary.toJSON();
  }

  async findAll() {
    const glossaries = await this.em.find(
      Glossary,
      {},
      {
        populate: [
          'terms.id',
          'terms.sourceTerm',
          'terms.targetTerm',
          'sourceLanguageCode.code',
          'targetLanguageCode.code',
        ],
      },
    );
    return glossaries.map((glossary) =>
      glossary.toJSON({
        populate: [
          'terms.id',
          'terms.sourceTerm',
          'terms.targetTerm',
          'sourceLanguageCode.code',
          'targetLanguageCode.code',
        ],
        exclude: ['terms.glossary'],
      }),
    );
  }

  async findOne(id: number) {
    const glossary = await this.em.findOne(Glossary, id, {
      populate: ['terms'],
    });
    if (!glossary) {
      throw new NotFoundException(`Glossary with id: ${id} not found`);
    }

    return glossary.toJSON({ populate: ['terms'] });
  }

  async createTerm(glossaryId: number, createTermDto: CreateTermDto) {
    const glossary = await this.findOne(glossaryId);
    if (!glossary) {
      throw new NotFoundException(`Glossary with id: ${glossaryId} not found
      `);
    }

    const term = this.termsService.create(
      createTermDto,
      this.em.getReference(Glossary, glossary.id as number),
    );
    return term;
  }
}
