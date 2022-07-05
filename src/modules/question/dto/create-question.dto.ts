import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {trimmer} from "../../../common/utils";

export class CreateQuestionDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Transform(trimmer)
    title: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Transform(trimmer)
    description: string;

}