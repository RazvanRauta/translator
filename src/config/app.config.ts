import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import validateConfig from '.././utils/validate-config';
import { AppConfig } from './app-config.type';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  SERVER_PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  APP_NAME: string;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  console.log('process.env', process.env);
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.SERVER_PORT
      ? parseInt(process.env.SERVER_PORT, 10)
      : 4000,
    apiPrefix: process.env.API_PREFIX || 'api',
    appName: process.env.APP_NAME || 'NestJS API',
  };
});
