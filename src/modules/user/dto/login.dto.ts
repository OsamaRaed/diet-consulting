import {IsNotEmpty, IsString} from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {trimmer} from "../../../common/utils";

export class LoginDto {

    @ApiProperty()
    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    usernameOrEmail: string;



    @Transform(trimmer)
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}