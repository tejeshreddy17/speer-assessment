import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CatchAllErrorsFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchAllErrorsFilter.name);

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const requestId = request.id;
    const response = ctx.getResponse<Response>();

    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      error instanceof HttpException ? error.message : 'Internal server error';

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(error, error.message);
      response.status(statusCode).json({
        statusCode,
        message,
        requestId,
      });
    } else {
      this.logger.warn(error, error.message);

      if (typeof error['response'] === 'string') {
        response.status(statusCode).json({
          statusCode,
          message,
          requestId,
        });
      } else {
        response.status(statusCode).json({
          ...error['response'],
          requestId,
        });
      }
    }
  }
}
