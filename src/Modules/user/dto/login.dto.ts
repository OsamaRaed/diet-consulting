import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {Transform, TransformFnParams} from "class-transformer";

export class LoginDto {
    @IsEmail()
    @IsOptional()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    userName?: string


    @IsNotEmpty()
    password: string;
}