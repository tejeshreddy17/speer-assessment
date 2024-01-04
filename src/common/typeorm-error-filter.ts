import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeORMErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMErrorFilter.name);

  catch(error: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.id;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (error['code'] === 'ER_DUP_ENTRY') {
      statusCode = HttpStatus.CONFLICT;
    }

    if (error['code'] === 'ER_NO_REFERENCED_ROW_2') {
      // Foreign key constraint failed
      statusCode = HttpStatus.BAD_REQUEST;
    }

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(error, error.message);
    }

    response.status(statusCode).json({
      statusCode,
      message: error.message,
      typeORMError: error.name,
      requestId,
    });
  }
}
