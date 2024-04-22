import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import * as httpContext from 'express-http-context';
import { HealthCheckModule } from './health-check/health-check.module';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import * as Sentry from '@sentry/node';
import { SentryWebhookModule } from '@domain/sentry-webhook/sentry-webhook.module';
import TelegramService from '@shared/telegram.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    HealthCheckModule,
    SentryWebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(SentryMiddleware)
      // .forRoutes({
      //   path: '*',
      //   method: RequestMethod.POST,
      // })
      // .apply(Sentry.Handlers.requestHandler, Sentry.Handlers.tracingHandler)
      // .forRoutes('*')
      .apply(httpContext.middleware)
      .forRoutes('*')
      .apply(LoggerMiddleware)
      .exclude({
        path: '/api/health',
        method: RequestMethod.GET,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
