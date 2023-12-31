import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface/typeErrorCustom';
export class ErrorManager extends Error {
  public static createError(error: errorType, type?: keyof typeof HttpStatus) {
    let message, status, code;

    if (
      typeof error === 'object' &&
      'type' in error &&
      !('detail' in error) &&
      !('code' in error)
    ) {
      type = error.type;
      status = HttpStatus[type];

      if ('message' in error) {
        message = typeof error === 'string' ? error : error.message;
      } else {
        message = statusMessages[type];
      }
    }

    if (error instanceof Error || typeof error === 'string') {
      message = typeof error === 'string' ? error : error.message;
      const name = message.split(' :: ')[0];
      status = HttpStatus[name as keyof typeof HttpStatus];
    }

    if (typeof error !== 'string') {
      if ('detail' in error && 'code' in error) {
        let errorCode!: any;
        errorCode = error.code;
        message = error.detail;

        if (message) {
          message = `::error-${errorCode}:: ${message}`;
        }
      }

      if (
        error instanceof GraphQLError &&
        'extensions' in error &&
        'code' in error.extensions
      ) {
        status = error.extensions.status;
        message = error.message;
        code = error.extensions.code;

        if (message) {
          error.message = message;
        }
      }
    }

    if (type) {
      status = HttpStatus[type as keyof typeof HttpStatus];
      code = type;
      if (!message) {
        message = statusMessages[type];
      }
    }

    if (!status) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      console.log('No status yet, setting to INTERNAL_SERVER_ERROR');
    }

    if (!message) {
      message = 'An unexpected error occurred';
    }
    const success = status >= 200 && status < 300;

    // *? Error handling without GraphQL
    //throw new HttpException(message, status);

    throw new GraphQLError(message, {
      extensions: {
        status,
        code: code || 'INTERNAL_SERVER_ERROR',
        success,
      },
    });
  }
}
