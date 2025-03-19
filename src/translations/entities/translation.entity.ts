import { Glossary } from '@/glossaries/entities/glossary.entity';
import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';

@Entity()
export class Translation extends BaseEntity {
  @ManyToOne(() => LanguageCode)
  sourceLanguageCode!: LanguageCode;

  @ManyToOne(() => LanguageCode)
  targetLanguageCode!: LanguageCode;

  @Property()
  sourceText!: string;

  @ManyToOne(() => Glossary, { nullable: true })
  glossary?: Glossary;
}
