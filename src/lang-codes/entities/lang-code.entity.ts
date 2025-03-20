import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '@/shared/entities/base-entity';

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
