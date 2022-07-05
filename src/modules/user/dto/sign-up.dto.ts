import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength} from "class-validator";
import {Transform} from "class-transformer";
import {PASSWORD_PATTERN} from "../../../common/constants";
import {MessagesEnum} from "../../../common/enums/messagesEnum";
import {ApiProperty} from "@nestjs/swagger";
import {trimmer} from "../../../common/utils";
import {RolesEnum} from "../../../common/enums/rolesEnum";

export class SignUpDto {

    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @Transform(trimmer)

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    firstName: string;

    @Transform(trimmer)

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    middleName?: string;

    @Transform(trimmer)
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    lastName: string;


    @Transform(trimmer)
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(trimmer)
    @Matches(PASSWORD_PATTERN, {message: MessagesEnum.WEAK_PASSWORD})
    password: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Transform(trimmer)
    @IsEnum(RolesEnum, {
        message: MessagesEnum.INVALID_ROLE
    })
    role: RolesEnum;
}