import { Glossary } from '@/glossaries/entities/glossary.entity';
import { BaseEntity } from '@/shared/entities/base-entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';

@Entity()
export class Term extends BaseEntity {
  @ManyToOne(() => Glossary, {
    nullable: true,
    deleteRule: 'cascade',
    updateRule: 'cascade',
  })
  glossary!: Glossary;

  @Property()
  sourceTerm!: string;

  @Property()
  targetTerm!: string;
}
