import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {Transform, TransformFnParams} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    @ApiProperty()

    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()

    userName?: string

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}