import { AutoMap } from '@automapper/classes';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';

import { Glossary } from '@/glossaries/entities/glossary.entity';
import { BaseEntity } from '@/shared/entities/base-entity';

@Entity()
export class Term extends BaseEntity {
  @ManyToOne(() => Glossary, {
    nullable: true,
    deleteRule: 'cascade',
    updateRule: 'cascade',
  })
  glossary!: Glossary;

  @AutoMap(() => String)
  @Property()
  sourceTerm!: string;

  @AutoMap(() => String)
  @Property()
  targetTerm!: string;
}
