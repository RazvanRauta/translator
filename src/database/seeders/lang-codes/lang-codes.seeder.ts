import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import * as fs from 'fs';
import csvParser from 'csv-parser';

export type LanguageCodeRow = {
  code: string;
  country: string;
};

export class LanguageCodesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const total = await em.count(LanguageCode, {});

    if (total > 0) {
      return;
    }

    const languageCodes: LanguageCode[] = [];

    fs.createReadStream('src/lang-codes/language-codes.csv')
      .pipe(csvParser())
      .on('data', (row: LanguageCodeRow) => {
        const languageCode = em.create(LanguageCode, {
          code: row.code,
          country: row.country,
        });
        languageCodes.push(languageCode);
      })
      .on('end', () => {
        em.persist(languageCodes)
          .flush()
          .then(() => {
            console.log('Language codes have been seeded');
          })
          .catch((e) => {
            console.error(e);
          });
      });
  }
}
