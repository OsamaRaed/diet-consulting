import {IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";
import {PASSWORD_PATTERN} from "../../../common/constants";
import {MESSAGES} from "../../../common/enums/messages";
import {ApiProperty} from "@nestjs/swagger";

export class SignUpDto {

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userName: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    firstName: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    middleName?: string;

    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    lastName: string;


    @Transform(({value}: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(PASSWORD_PATTERN, {message: MESSAGES.WEAK_PASSWORD})
    password: string;
}