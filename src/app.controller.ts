import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  getMessages(@Req() request: Request, @Body() body: any): string {
    console.log('request', request);
    console.log('body', body);

    return 'Sentry Telegram Webhook';
  }
}
