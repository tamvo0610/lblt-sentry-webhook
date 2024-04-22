import { Config, NestConfig, SentryConfig } from '@config/config.interface';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SentryFilter } from '@filter/sentry.filter';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Config> = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const sentryConfig = configService.get<SentryConfig>('sentry');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  // Sentry.init({
  //   dsn: sentryConfig.dns,
  //   // integrations: [],
  //   // tracesSampleRate: 1.0,
  //   // environment: 'production',
  // });

  await app.listen(nestConfig.port, () => {
    Logger.log(`Server running on http://localhost:${nestConfig.port}`);
  });
}
bootstrap();
