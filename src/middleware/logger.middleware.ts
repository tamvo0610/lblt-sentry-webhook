import { LoggerService } from '@core/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _logger = new LoggerService(LoggerMiddleware.name);
  use(request: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const ipAddress = request.headers['x-forwarded-for'];
    this._logger.log(
      `${ipAddress} - [${request.method}] - ${request.url} - REQUEST HEADER -`,
      request.headers,
    );
    this._logger.log(`${ipAddress} - REQUEST BODY -`, request?.body);
    res.on('close', () => {
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      this._logger.log(
        `${ipAddress} - [${request.method}] - ${request.url} - [${responseTime}]ms`,
      );
    });
    next();
  }
}
