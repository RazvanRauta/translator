import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { LanguageCodesSeeder } from './lang-codes/lang-codes.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [LanguageCodesSeeder]);
  }
}
