import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

interface TelegramBot {
  id: number;
  token: string;
  groupId: string;
  topicId: number;
  prj: string;
  prjId: string;
  prjName: string;
}

@Injectable()
export class JsonDbService {
  private readonly dbFilePath = 'db.json';
  private readFile = util.promisify(fs.readFile);
  private writeFile = util.promisify(fs.writeFile);

  async getDefaultBot(): Promise<TelegramBot> {
    const data = await this.readFile(this.dbFilePath, 'utf-8');
    return JSON.parse(data)?.defaultBot;
  }

  async getBots(): Promise<TelegramBot[]> {
    const data = await this.readFile(this.dbFilePath, 'utf-8');
    return JSON.parse(data)?.bots || [];
  }

  async getBotById(id: number) {
    const bots = await this.getBots();
    return bots.find((bot) => bot.id === id);
  }

  async getBotByPrj(prjId: string) {
    const bots = await this.getBots();
    return bots.find((bot) => bot.prjId === prjId);
  }

  async updateDbData(newData: any): Promise<void> {
    const data = JSON.stringify(newData, null, 2);
    await this.writeFile(this.dbFilePath, data);
  }
}
