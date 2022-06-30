import { HttpException, HttpStatus } from '@nestjs/common';
import { EXCEPTIONS } from '../enums/exceptions';

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

export const DraftAlreadyExists = new HttpException(
    EXCEPTIONS.DRAFT_ALREADY_EXISTS,
    HttpStatus.CONFLICT,
);

export const QuestionNotFound = new HttpException(
    EXCEPTIONS.QUESTION_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const AnswerNotFound = new HttpException(
    EXCEPTIONS.ANSWER_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const InvalidCredentials = new HttpException(
    EXCEPTIONS.INVALID_CREDENTIALS,
    HttpStatus.UNAUTHORIZED,
);
