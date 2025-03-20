import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { parse } from 'csv-parse';
import * as fs from 'fs';

import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';

export type LanguageCodeRow = {
  code: string;
  country: string;
};

export class LanguageCodesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const total = await em.count(LanguageCode, {});

    if (total > 0) {
      console.log('Language codes have already been seeded');
      return;
    }

    const languageCodes: LanguageCode[] = [];

    const parser = fs
      .createReadStream('src/lang-codes/language-codes.csv')
      .pipe(
        parse({
          fromLine: 2,
          columns: ['code', 'country'],
        }),
      );
    for await (const record of parser) {
      const { code, country } = record as LanguageCodeRow;
      const languageCode = em.create(LanguageCode, {
        code,
        country,
      });
      languageCodes.push(languageCode);
    }

    em.persist(languageCodes)
      .flush()
      .catch((e) => {
        console.error('Error seeding language codes', e);
      });
  }
}
