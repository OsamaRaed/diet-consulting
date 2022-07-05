import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";
import {trimmer} from "../../../common/utils";


export class VoteDto {

    @ApiProperty()
    @IsNotEmpty()
    @Transform(trimmer)
    answerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(trimmer)
    vote: boolean;
}