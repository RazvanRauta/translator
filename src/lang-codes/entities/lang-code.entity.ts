import { BaseEntity } from '@/shared/entities/base-entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class LanguageCode extends BaseEntity {
  @Property({
    unique: true,
    index: true,
  })
  code!: string;

  @Property()
  country!: string;
}
