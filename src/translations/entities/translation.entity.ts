import { AutoMap } from '@automapper/classes';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';

import { Glossary } from '@/glossaries/entities/glossary.entity';
import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';
import { BaseEntity } from '@/shared/entities/base-entity';

@Entity()
export class Translation extends BaseEntity {
  @AutoMap(() => LanguageCode)
  @ManyToOne(() => LanguageCode)
  sourceLanguageCode!: LanguageCode;

  @AutoMap(() => LanguageCode)
  @ManyToOne(() => LanguageCode)
  targetLanguageCode!: LanguageCode;

  @AutoMap(() => String)
  @Property()
  sourceText!: string;

  @AutoMap(() => Glossary)
  @ManyToOne(() => Glossary, { nullable: true })
  glossary?: Glossary;
}
