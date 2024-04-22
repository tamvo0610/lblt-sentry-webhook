import { CheckIssueTypeMiddleware } from '@middleware/sentry-webhook/check-issue-type.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JsonDbService } from '@shared/jsonDb.service';
import TelegramService from '@shared/telegram.service';
import { SentryWebhookController } from './sentry-webhook.controller';
import { SentryWebhookService } from './sentry-webhook.service';

@Module({
  controllers: [SentryWebhookController],
  providers: [SentryWebhookService, TelegramService, JsonDbService],
  exports: [],
})
export class SentryWebhookModule {}
