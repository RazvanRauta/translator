import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import {
  CreateRequestContext,
  MikroORM,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LoggerMiddleware } from './app.middleware';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { createDbConfig } from './database/create-db-config';
import { DatabaseSeeder } from './database/seeders/database.seeder';
import { GlossariesModule } from './glossaries/glossaries.module';
import { LangCodesModule } from './lang-codes/lang-codes.module';
import { MapperModule } from './mapper/mapper.module';
import { IsLanguageCode } from './shared/validators/is-language-code.validator';
import { TermsModule } from './terms/terms.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: '.env.local',
    }),
    MapperModule,
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      useFactory: (configService: ConfigService) =>
        createDbConfig(configService),
      inject: [ConfigService],
    }),
    LangCodesModule,
    GlossariesModule,
    TermsModule,
    TranslationsModule,
  ],
  providers: [IsLanguageCode],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async onModuleInit() {
    // automatically runs migrations and seeds the database
    await this.orm.getMigrator().up();
    await this.orm.getSeeder().seed(DatabaseSeeder);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, MikroOrmMiddleware).forRoutes('*path');
  }
}
