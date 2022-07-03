import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateAnswerDto {

    @ApiProperty()

    @IsNotEmpty()
    @IsString()
    title: string;
    @ApiProperty()

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()

    recommendations: string[];

    @IsNotEmpty()
    @ApiProperty()

    questionId: number;
}