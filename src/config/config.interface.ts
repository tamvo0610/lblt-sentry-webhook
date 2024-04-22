export interface NestConfig {
  port: number;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}
export interface MongooseConfig {
  dbName: string;
  dbUrl: string;
}

export interface SentryConfig {
  dns: string;
  token: string;
  api_secret: string;
  org: string;
}

export interface Config {
  nest: NestConfig;
  swagger: SwaggerConfig;
  mongoose: MongooseConfig;
  sentry: SentryConfig;
}
