import * as httpContext from 'express-http-context';
import { Logger } from '@nestjs/common';

export interface ILogger {
  log(message: string, data?: string | Record<string, any>): void;
  error(message: string, data?: string | Record<string, any>): void;
  warn(message: string, data?: string | Record<string, any>): void;
  debug(message: string, data?: string | Record<string, any>): void;
}

type LOG_METHOD = 'log' | 'error' | 'warn' | 'debug';

export class LoggerService implements ILogger {
  private _logger: Logger;

  constructor(context: string) {
    this._logger = new Logger(context);
  }
  log(message: string, data?: string | Record<string, any>) {
    this._writeLog('log', message, data);
  }

  error(message: string, data?: string | Record<string, any>) {
    this._writeLog('error', message, data);
  }

  warn(message: string, data?: string | Record<string, any>) {
    this._writeLog('warn', message, data);
  }

  debug(message: string, data?: string | Record<string, any>) {
    this._writeLog('debug', message, data);
  }
  private _writeLog(
    method: LOG_METHOD,
    message: string,
    data?: string | Record<string, any>,
  ) {
    this._logger[method](message);
    // const payload = this._preparePayload(message, data);
    // this._logger[method](payload);
  }
}
