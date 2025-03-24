import { Migration } from '@mikro-orm/migrations';

export class Migration20250319175948 extends Migration {
	override async up(): Promise<void> {
		this.addSql(
			`create table "language_code" ("id" serial primary key, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "deleted_at" timestamptz null, "code" varchar(255) not null, "country" varchar(255) not null);`,
		);
		this.addSql(
			`create index "language_code_code_index" on "language_code" ("code");`,
		);
		this.addSql(
			`alter table "language_code" add constraint "language_code_code_unique" unique ("code");`,
		);

		this.addSql(
			`create table "glossary" ("id" serial primary key, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "deleted_at" timestamptz null, "source_language_code_id" int not null, "target_language_code_id" int not null);`,
		);
		this.addSql(
			`alter table "glossary" add constraint "glossary_source_language_code_id_target_language_code_id_unique" unique ("source_language_code_id", "target_language_code_id");`,
		);

		this.addSql(
			`create table "term" ("id" serial primary key, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "deleted_at" timestamptz null, "glossary_id" int null, "source_term" varchar(255) not null, "target_term" varchar(255) not null);`,
		);

		this.addSql(
			`create table "translation" ("id" serial primary key, "created_at" timestamptz null default now(), "updated_at" timestamptz null default now(), "deleted_at" timestamptz null, "source_language_code_id" int not null, "target_language_code_id" int not null, "source_text" varchar(255) not null, "glossary_id" int null);`,
		);

		this.addSql(
			`alter table "glossary" add constraint "glossary_source_language_code_id_foreign" foreign key ("source_language_code_id") references "language_code" ("id") on update cascade;`,
		);
		this.addSql(
			`alter table "glossary" add constraint "glossary_target_language_code_id_foreign" foreign key ("target_language_code_id") references "language_code" ("id") on update cascade;`,
		);

		this.addSql(
			`alter table "term" add constraint "term_glossary_id_foreign" foreign key ("glossary_id") references "glossary" ("id") on update cascade on delete cascade;`,
		);

		this.addSql(
			`alter table "translation" add constraint "translation_source_language_code_id_foreign" foreign key ("source_language_code_id") references "language_code" ("id") on update cascade;`,
		);
		this.addSql(
			`alter table "translation" add constraint "translation_target_language_code_id_foreign" foreign key ("target_language_code_id") references "language_code" ("id") on update cascade;`,
		);
		this.addSql(
			`alter table "translation" add constraint "translation_glossary_id_foreign" foreign key ("glossary_id") references "glossary" ("id") on update cascade on delete set null;`,
		);
	}
}
