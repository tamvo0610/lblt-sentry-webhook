import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthCheckController {
  @Get()
  health(@Res() response: Response) {
    return response.status(200).send('ok');
  }
}
