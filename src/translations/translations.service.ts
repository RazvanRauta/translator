import { EntityManager } from '@mikro-orm/core';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Glossary } from '@/glossaries/entities/glossary.entity';
import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';

import { CreateTranslationDto } from './dto/create-translation.dto';
import { Translation } from './entities/translation.entity';

@Injectable()
export class TranslationsService {
  constructor(private readonly em: EntityManager) {}

  async create(createTranslationDto: CreateTranslationDto) {
    const { sourceLanguageCode, targetLanguageCode, sourceText, glossaryId } =
      createTranslationDto;

    if (sourceText.length > 5000) {
      throw new BadRequestException(
        'Source text exceeds maximum length of 5000 characters',
      );
    }

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

    let glossary: Glossary;
    if (glossaryId) {
      glossary = await this.em.findOneOrFail(Glossary, {
        id: glossaryId,
        sourceLanguageCode: sourceLanguage,
        targetLanguageCode: targetLanguage,
      });
    } else {
      glossary = await this.em.findOneOrFail(Glossary, {
        sourceLanguageCode: sourceLanguage,
        targetLanguageCode: targetLanguage,
      });
    }

    const translation = this.em.create(Translation, {
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
      sourceText,
      glossary,
    });

    await this.em.persistAndFlush(translation);
    return translation.toJSON();
  }

  async findOne(id: number): Promise<{
    [key: string]: any;
  }> {
    const translation = await this.em.findOneOrFail(Translation, id, {
      populate: ['glossary.terms'],
    });

    let highlightedSourceText = translation.sourceText;

    if (translation.glossary) {
      const terms = translation.glossary.terms.getItems();
      terms.forEach((term) => {
        const regex = new RegExp(`\\b${term.sourceTerm}\\b`, 'gi');
        if (regex.test(highlightedSourceText)) {
          highlightedSourceText = highlightedSourceText.replace(
            regex,
            `<HIGHLIGHT>${term.sourceTerm}</HIGHLIGHT>`,
          );
        }
      });
    }

    return { ...translation.toJSON(), sourceText: highlightedSourceText };
  }
}
