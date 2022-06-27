import { HttpException, HttpStatus } from '@nestjs/common';
import { EXCEPTIONS } from '../enums/exceptions';

export const InternalServerError = new HttpException(
    EXCEPTIONS.INTERNAL_SERVER_ERROR,
    HttpStatus.INTERNAL_SERVER_ERROR,
);

export const UnAuthorizedUser = new HttpException(
    EXCEPTIONS.USER_NOT_AUTHORIZED,
    HttpStatus.UNAUTHORIZED,
);

export const UserNotFound = new HttpException(
    EXCEPTIONS.USER_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const UserAlreadyExists = new HttpException(
    EXCEPTIONS.USER_ALREADY_EXISTS,
    HttpStatus.CONFLICT,
);

export const InvalidCredentials = new HttpException(
    EXCEPTIONS.INVALID_CREDENTIALS,
    HttpStatus.UNAUTHORIZED,
);
