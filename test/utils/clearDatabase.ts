import { EntityManager } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/postgresql';

import { DatabaseSeeder } from '@/database/seeders/database.seeder';

export const clearDatabase = async (orm: MikroORM) => {
	const em: EntityManager = orm.em;
	const connection = em.getConnection();
	const entities = em.getMetadata().getAll();
	for (const entity of Object.values(entities)) {
		const tableName = entity.collection;
		await connection.execute(
			`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
		);
	}
	await orm.getSeeder().seed(DatabaseSeeder);
};
