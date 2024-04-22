import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface IssueTagsType {
  'os.name': string;
  device: string;
  os: string;
  environment: string;
}

@Injectable()
export class SentryWebhookService {
  async getIssueTags(issueID: string): Promise<IssueTagsType> {
    const url = `https://sentry.io/api/0/issues/${issueID}/tags/`;
    const options = {
      headers: {
        Authorization:
          'Bearer 812e054c20d902e044d83efbb1f3d619bdca4bed6a26223c5fca92c2683b007f',
      },
    };
    const { data } = await axios.get(url, options);
    const result = data.reduce((acc, item) => {
      acc[item.key] = item.topValues[0].value;
      return acc;
    }, {});
    return result;
  }

  // async getTelegramChatID(req: any) {
  //   const TELEGRAM_BOT_TOKEN = '6728236822:AAEveRsh_mP_qObgqlE29WFykIolEp6soTY';
  //   const TELEGRAM_GROUP_CHAT_ID = '-1002096270907';
  //   const reply_to_message_id = 2;
  //   const payload = {
  //     bot_token: TELEGRAM_BOT_TOKEN,
  //     group_chat_id: req?.chatID || TELEGRAM_GROUP_CHAT_ID,
  //     reply_to_message_id: req?.subChat || reply_to_message_id,
  //   };
  //   return payload;
  // }

  // async generateMessage(body: any, issueTags: any) {
  //   // ${environment === 'production' ? "🆘💣💥 " : ""}Crash app nè mấy fen, vô fix đi...
  //   //   \n- <b>Tên app</b>: ${formatAppName(issue.shortId)}\n- <b>Tiêu đề</b>: ${issue.title}\n- <b>Bị crash ở file</b>: ${issue.culprit}\n- <b>Môi trường</b>: ${environment}\n- <b>Hệ điều hành</b>: ${operationSystem}
  //   //   \n<b>Xem chi tiết</b>: <a href="${linkSentry}">Tại đây</a>
  //   //   `
  //   //   : `
  //   //   Meo meo meo meo trả lại tâm trí tôi đây
  //   //   \n- <b>Tên app</b>: ${formatAppName(issue.shortId)}\n- <b>Tiêu đề</b>: ${issue.title}\n- <b>Lỗi ở file</b>: ${issue.culprit}\n- <b>Môi trường</b>: ${environment}\n- <b>Hệ điều hành</b>: ${operationSystem}
  //   //   \n<b>Xem chi tiết</b>: <a href="${linkSentry}">Tại đây</a>
  //   const message = `Crash app nè mấy fen, vô fix đi...

  //   - Tên app: Test Ne ok hong
  //   - Tiêu đề: TypeError: network error
  //   - Bị crash ở file: http://localhost:3008/
  //   - Môi trường: development
  //   - Hệ điều hành: Mac OS X >=10.15.7

  //   Xem chi tiết: Tại đây`;
  //   return message;
  // }

  // async sendTelegramMessage(group: any, message: any) {
  //   await axios({
  //     method: 'get',
  //     url: `https://api.telegram.org/bot${group?.bot_token}/sendMessage`,
  //     params: {
  //       chat_id: group?.group_chat_id,
  //       reply_to_message_id: group?.reply_to_message_id,
  //       text: message,
  //       parse_mode: 'html',
  //     },
  //   });
  // }
}
