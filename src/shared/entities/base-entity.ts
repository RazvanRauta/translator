import {
  BaseEntity as MikroBaseEntity,
  Config,
  DefineConfig,
  Entity,
  Filter,
  OptionalProps,
  PrimaryKey,
  Property,
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
  [Config]?: DefineConfig<{ forceObject: true }>;

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, defaultRaw: 'now()' })
  createdAt?: Date | null = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true, defaultRaw: 'now()' })
  updatedAt?: Date | null = new Date();

  @Property({ type: Date, nullable: true })
  deletedAt?: Date | null;

  toJSON() {
    return this.toObject();
  }

  constructor(data: Partial<BaseEntity> = {}) {
    super();
    Object.assign(this, data);
  }
}
