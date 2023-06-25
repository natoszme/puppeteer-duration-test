import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import _ from "lodash";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl, body } = request;

    if (method === 'POST')
      this.logger.log(`body: ${JSON.stringify(_.omit(body, "password"))}`);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const diff = process.hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime} ms`
      );
    });

    next();
  }
}