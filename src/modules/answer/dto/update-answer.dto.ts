import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UpdateAnswerDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsOptional()
    recommendations?: string[];

    @ApiProperty()
    @IsOptional()
    isDraft?: boolean;
}