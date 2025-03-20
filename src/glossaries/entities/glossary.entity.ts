import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Unique,
} from '@mikro-orm/postgresql';

import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import { Term } from '@/terms/entities/term.entity';

@Entity()
@Unique({ properties: ['sourceLanguageCode', 'targetLanguageCode'] })
export class Glossary extends BaseEntity {
  @ManyToOne(() => LanguageCode)
  sourceLanguageCode!: LanguageCode;

  @ManyToOne(() => LanguageCode)
  targetLanguageCode!: LanguageCode;

  @OneToMany(() => Term, (term) => term.glossary)
  terms = new Collection<Term>(this);
}
