import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {trimmer} from "../../../common/utils";
import {Transform} from "class-transformer";
import {PartialType} from "@nestjs/mapped-types";
import {CreateAnswerDto} from "./create-answer.dto";


export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Transform(trimmer)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Transform(trimmer)
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsOptional()
    @Transform(trimmer)
    recommendations: string;

    @ApiProperty()
    @IsOptional()
    @Transform(trimmer)
    isDraft: boolean;
}