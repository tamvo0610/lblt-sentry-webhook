import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryMiddleware implements NestMiddleware {
  use(request: Request, res: Response, next: NextFunction) {
    Sentry.Handlers.requestHandler()(request, res, next);
    Sentry.Handlers.tracingHandler()(request, res, next);
  }
}
