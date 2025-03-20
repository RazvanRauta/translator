import { AutoMap } from '@automapper/classes';
import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '@/shared/entities/base-entity';

@Entity()
export class LanguageCode extends BaseEntity {
  @AutoMap(() => String)
  @Property({
    unique: true,
    index: true,
  })
  code!: string;

  @AutoMap(() => String)
  @Property()
  country!: string;
}
