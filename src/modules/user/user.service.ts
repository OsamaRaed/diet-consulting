import {Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {User} from "./user.model";


import {LoginDto} from "./dto/login.dto";
import {SignUpDto} from "./dto/sign-up.dto";
import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Op, Transaction} from "sequelize";
import {InvalidCredentials, UserAlreadyExists, UserNotFound} from "../../common/utils/errors";
import {ConfigService} from "@nestjs/config";
import {comparePassword, generateToken, hashPassword} from "../../common/utils";


@Injectable()
export class UserService {
    constructor(
        @Inject(ProvidersEnum.USER) private readonly userModel: typeof User,
        private readonly configService: ConfigService,
    ) {
    }

    async findByUsernameOrEmail(username: string, email: string) : Promise<User> {
        return await this.userModel.findOne({
            where: {
                [Op.or]: [
                    {username: username},
                    {email: email}
                ]
            }
        })
    }

    async signup(signUpDto: SignUpDto, transaction: Transaction) {
        const user = await this.findByUsernameOrEmail(signUpDto.username, signUpDto.email);
        if (user) {
            throw UserAlreadyExists;
        }
        signUpDto.password = await hashPassword(signUpDto.password);
        try {
            const newUser = await this.userModel.create({...signUpDto},{transaction});
            return {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                },
                token: generateToken(newUser.id, this.configService.get("jwt").secret)
            };
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async login(loginDto: LoginDto) {

        const user = await this.findByUsernameOrEmail(loginDto.usernameOrEmail, loginDto.usernameOrEmail);
        if (!user) {
            throw InvalidCredentials;
        }
        const checkPass = await comparePassword(loginDto.password, user.password)
        if (!checkPass) {
            throw InvalidCredentials;
        }
        return {
            access_token: generateToken(user.id, this.configService.get("jwt").secret)
        };


    }

    async findById(id: number): Promise<User> {
        const user = await this.userModel.findOne({where: {id: id}});
        if (!user) {
            throw UserNotFound;
        }
        return user;
    }

}