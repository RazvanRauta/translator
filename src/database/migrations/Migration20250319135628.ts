import { Migration } from '@mikro-orm/migrations';

export class Migration20250319135628 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "language_code" ("id" serial primary key, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "deleted_at" timestamptz null, "code" varchar(255) not null, "country" varchar(255) not null);`);
    this.addSql(`create index "language_code_code_index" on "language_code" ("code");`);
    this.addSql(`alter table "language_code" add constraint "language_code_code_unique" unique ("code");`);
  }

}
