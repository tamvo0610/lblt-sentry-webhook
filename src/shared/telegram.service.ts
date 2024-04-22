import { LoggerService } from '@core/logger.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface PayloadGenerateMessage {
  id: string;
  app_name: string;
  title: string;
  file: string;
  environment: string;
  metadatatype: string;
  level: string;
  os: string;
}

interface PayloadSendMessage {
  bot_token: string;
  chat_id: string;
  reply_to_message_id?: number;
  text: string;
}

Injectable();
export default class TelegramService {
  private _logger = new LoggerService(TelegramService.name);
  private sentryType = {
    typeError: 'TypeError',
    referenceError: 'ReferenceError',
  };

  async generateMessage(payload: PayloadGenerateMessage): Promise<string> {
    // payload.level === 'fatal';
    if (
      payload.metadatatype === this.sentryType.referenceError ||
      payload.metadatatype === this.sentryType.typeError
    ) {
      return `🆘💣💥 Crash app nè mấy fen, vô fix đi...
      - Tên app: ${this.formatAppName(payload.app_name)}
      - Tiêu đề: ${payload.title}
      - Bị crash ở file: ${payload.file}
      - Môi trường: ${payload.environment}
      - Hệ điều hành: ${payload.os}
            
      Xem chi tiết: <a href="${this.getIssueLink(payload.id)}">Tại đây</a>`;
    }
    return `Meo meo meo meo trả lại tâm trí tôi đây
    - Tên app: ${this.formatAppName(payload.app_name)}
    - Tiêu đề: ${payload.title}
    - Lỗi ở file: ${payload.file}
    - Môi trường: ${payload.environment}
    - Hệ điều hành: ${payload.os}
          
    Xem chi tiết: <a href="${this.getIssueLink(payload.id)}">Tại đây</a>`;
  }

  async sendMessage(payload: PayloadSendMessage): Promise<void> {
    return await axios({
      method: 'get',
      url: `https://api.telegram.org/bot${payload?.bot_token}/sendMessage`,
      params: {
        chat_id: payload?.chat_id,
        reply_to_message_id: payload?.reply_to_message_id,
        text: payload?.text,
        parse_mode: 'html',
      },
    });
  }

  private formatAppName(appName: string) {
    for (let index = appName.length; ; index--) {
      const element = appName[index];
      if (element === '-') {
        appName = appName.slice(0, index);
        break;
      }
    }
    return appName;
  }

  private getIssueLink(issueId: string) {
    return `https://libertytechnology.sentry.io/issues/${issueId}`;
  }
}
