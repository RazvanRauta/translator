import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { createDbConfig } from './database/create-db-config';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import {
  CreateRequestContext,
  MikroORM,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { LoggerMiddleware } from './app.middleware';
import { LangCodesModule } from './lang-codes/lang-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: '.env.local',
    }),
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      useFactory: (configService: ConfigService) =>
        createDbConfig(configService),
      inject: [ConfigService],
    }),
    LangCodesModule,
  ],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async onModuleInit() {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, MikroOrmMiddleware).forRoutes('*path');
  }
}
