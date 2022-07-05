import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {trimmer} from "../../../common/utils";


export class CreateAnswerDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(trimmer)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(trimmer)
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsString()
    @Transform(trimmer)
    recommendations: string;

    @IsNotEmpty()
    @ApiProperty()
    @Transform(trimmer)
    questionId: number;


    @IsNotEmpty()
    @ApiProperty()
    @Transform(trimmer)
    isDraft: boolean;

}