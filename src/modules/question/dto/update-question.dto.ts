import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateQuestionDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description?: string;
}