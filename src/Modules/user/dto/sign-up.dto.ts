import {IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";
import {PASSWORD_PATTERN} from "../../../common/constants";
import {MESSAGES} from "../../../common/enums/messages";

export class SignUpDto {

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    userName: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    middleName?: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    lastName: string;


    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(PASSWORD_PATTERN, {message: MESSAGES.WEAK_PASSWORD})
    password: string;
}