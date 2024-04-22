import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class CheckIssueTypeMiddleware implements NestMiddleware {
  async use(request: Request, _: Response, next: NextFunction) {
    const resource = request.get('sentry-hook-resource');
    const body = request.body;
    const issue = body?.data?.issue;
    if (resource !== 'issue' || !issue?.id) {
      throw new Error('No issue found.');
    }
    if (body.action !== 'created') {
      throw new Error('Not issue created.');
    }
    next();
  }
}
