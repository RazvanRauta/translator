import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<AllConfigType>);
  const globalPrefix = configService.getOrThrow('app.apiPrefix', {
    infer: true,
  });

  app.enableShutdownHooks();
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const port = configService.getOrThrow('app.port', { infer: true });
  const appName = configService.getOrThrow('app.appName', { infer: true });
  const host = '0.0.0.0';

  await app.listen(port, host);

  Logger.log(
    `🚀 ${appName} is running on: http://${host}:${port}/${globalPrefix}`,
  );
}
void bootstrap();
