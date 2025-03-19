import 'reflect-metadata';

import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.local`,
});

export default defineConfig({
  metadataProvider: ReflectMetadataProvider,
  serialization: { forceObject: true },
  highlighter: new SqlHighlighter(),
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  pool: {
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
  },
  debug: true,
  extensions: [EntityGenerator, Migrator, SeedManager],
  seeder: {
    path: './dist/database/seeders',
    pathTs: './src/database/seeders',
    emit: 'ts',
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './src/database/migrations',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    emit: 'ts',
  },
});
