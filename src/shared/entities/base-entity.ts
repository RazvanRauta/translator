import { AutoMap } from '@automapper/classes';
import {
  AutoPath,
  BaseEntity as MikroBaseEntity,
  Entity,
  OptionalProps,
  PopulatePath,
  PrimaryKey,
  Property,
  serialize,
  UnboxArray,
} from '@mikro-orm/postgresql';

@Entity({
  abstract: true,
})
export class BaseEntity extends MikroBaseEntity {
  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

  @AutoMap(() => Number)
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, defaultRaw: 'now()' })
  createdAt?: Date | null = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true, defaultRaw: 'now()' })
  updatedAt?: Date | null = new Date();

  @Property({ type: Date, nullable: true })
  deletedAt?: Date | null;

  toJSON<T extends this, P extends string = never, E extends string = never>({
    populate,
    exclude,
  }: {
    populate?: readonly AutoPath<UnboxArray<T>, P, `${PopulatePath.ALL}`>[];
    exclude?: readonly AutoPath<T, E>[];
  } = {}): Record<string, any> {
    return serialize(this, {
      populate: populate as readonly AutoPath<
        UnboxArray<this>,
        P,
        `${PopulatePath.ALL}`
      >[],
      exclude: exclude as readonly AutoPath<UnboxArray<this>, E>[],
    });
  }

  constructor(data: Partial<BaseEntity> = {}) {
    super();
    Object.assign(this, data);
  }
}
