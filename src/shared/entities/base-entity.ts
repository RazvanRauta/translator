import {
  BaseEntity as MikroBaseEntity,
  Entity,
  Filter,
  OptionalProps,
  PrimaryKey,
  Property,
  serialize,
  AutoPath,
  PopulatePath,
  UnboxArray,
} from '@mikro-orm/postgresql';

@Entity({
  abstract: true,
})
// apply filter to all queries by default
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: { $eq: null } },
  default: true,
})
export class BaseEntity extends MikroBaseEntity {
  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

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
