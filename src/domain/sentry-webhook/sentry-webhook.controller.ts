import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { JsonDbService } from '@shared/jsonDb.service';
import TelegramService from '@shared/telegram.service';
import { Request } from 'express';
import { SentryWebhookData } from './interfaces/sentry-webhook.interface';
import { SentryWebhookService } from './sentry-webhook.service';

@Controller({ path: 'sentry-webhook' })
export class SentryWebhookController {
  constructor(
    private readonly _sentrySrv: SentryWebhookService,
    private readonly _telegram: TelegramService,
    private readonly _dbService: JsonDbService,
  ) {}

  @Post()
  async postMessage(@Req() request: Request, @Body() body: SentryWebhookData) {
    const resource = request.get('sentry-hook-resource');
    const issue = body?.data?.issue;
    if (resource !== 'issue' || !issue?.id || body.action !== 'created') {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '',
          message: 'No issue found.',
        },
        HttpStatus.OK,
      );
    }

    const issueTags = await this._sentrySrv.getIssueTags(body?.data?.issue?.id);
    const chatBot = await this._dbService.getBotByPrj(issue.project.id);
    const message = await this._telegram.generateMessage({
      id: issue.id,
      app_name: issue.shortId,
      title: issue.metadata.value,
      file: issue.metadata.filename,
      environment: issueTags.environment,
      metadatatype: issue.metadata.type,
      level: issue.level,
      os: issueTags.os,
    });
    await this._telegram.sendMessage({
      bot_token: chatBot?.token,
      chat_id: chatBot?.groupId,
      reply_to_message_id: chatBot?.topicId,
      text: message,
    });
    return `Webhook send message success`;
  }
}
