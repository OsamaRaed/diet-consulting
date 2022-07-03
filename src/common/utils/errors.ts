import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionsEnum } from '../enums/exceptionsEnum';

export const UnAuthorizedUser = new HttpException(
    ExceptionsEnum.USER_NOT_AUTHORIZED,
    HttpStatus.UNAUTHORIZED,
);

export const UserNotFound = new HttpException(
    ExceptionsEnum.USER_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const UserAlreadyExists = new HttpException(
    ExceptionsEnum.USER_ALREADY_EXISTS,
    HttpStatus.CONFLICT,
);

export const DraftAlreadyExists = new HttpException(
    ExceptionsEnum.DRAFT_ALREADY_EXISTS,
    HttpStatus.CONFLICT,
);

export const QuestionNotFound = new HttpException(
    ExceptionsEnum.QUESTION_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const AnswerNotFound = new HttpException(
    ExceptionsEnum.ANSWER_NOT_FOUND,
    HttpStatus.NOT_FOUND,
);

export const InvalidCredentials = new HttpException(
    ExceptionsEnum.INVALID_CREDENTIALS,
    HttpStatus.UNAUTHORIZED,
);
