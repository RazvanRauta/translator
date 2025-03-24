import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@/config/config.type';

export function createDbConfig(configService: ConfigService<AllConfigType>) {
	return defineConfig({
		metadataProvider: ReflectMetadataProvider,
		serialization: { forceObject: true },
		entities: ['./dist/**/*.entity.js'],
		entitiesTs: ['./src/**/*.entity.ts'],
		dbName: configService.get('database.name', { infer: true }),
		host: configService.get('database.host', { infer: true }),
		port: configService.get('database.port', { infer: true }),
		user: configService.get('database.username', { infer: true }),
		password: configService.get('database.password', { infer: true }),
		pool: {
			max: configService.get('database.maxConnections', { infer: true }),
		},
		extensions: [Migrator, SeedManager],
		migrations: {
			tableName: 'mikro_orm_migrations',
			pathTs: 'src/database/migrations',
			path: 'dist/database/migrations',
			transactional: true,
			disableForeignKeys: true,
			allOrNothing: true,
		},
		seeder: {
			path: 'dist/database/seeders',
			pathTs: 'src/database/seeders',
			emit: 'ts',
		},
		driverOptions: {
			connection: {
				ssl: false,
			},
		},
	});
}
