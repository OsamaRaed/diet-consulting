import {Inject, Injectable} from "@nestjs/common";
import {User} from "../user.model";
import * as bcrypt from "bcrypt";
import {sign} from "jsonwebtoken";
import {compare} from "bcrypt";


import {LoginDto} from "../dto/login.dto";
import {SignUpDto} from "../dto/sign-up.dto";
import {PROVIDERS} from "../../../common/enums/providers";
import {Op} from "sequelize";
import {InvalidCredentials, UserAlreadyExists, UserNotFound} from "../../../common/utils/errors";
import {ROLES} from "../../../common/enums/roles";
import {MESSAGES} from "../../../common/enums/messages";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class UserService {
    constructor(
        @Inject(PROVIDERS.USER) private readonly userModel: typeof User,
        private readonly configService: ConfigService,
    ) {
    }

    async findByUsernameOrEmail(username: string, email: string) {
        return await this.userModel.findOne({
            where: {
                [Op.or]: [
                    {username: username,},
                    {email: email}
                ]
            }
        })
    }

    async signup(body: SignUpDto, role: ROLES) {
        const user = await this.findByUsernameOrEmail(body.userName, body.email);
        if (user) {
            throw UserAlreadyExists;
        }
        const hash = await bcrypt.hash(body.password, 10);
        await this.userModel.create({
            email: body.email,
            userName: body.userName,
            firstName: body.firstName,
            middleName: body.middleName,
            lastName: body.lastName,
            password: hash,
            role: role
        });
        return {
            message: MESSAGES.USER_CREATED
        };
    }

    async login(body: LoginDto) {
        const user = await this.findByUsernameOrEmail(body.userName, body.email);
        if (!user) {
            throw InvalidCredentials;
        }
        const checkPass = await this.comparePassword(body.password, user.password)
        if (!checkPass) {
            throw InvalidCredentials;
        }
        return {
            access_token: sign(user.id, this.configService.get("jwt").secret)
        };
    }

    async findById(id: number): Promise<User> {
        const user = await this.userModel.findOne({ where: { id: id } });
        if(!user) {
            throw UserNotFound;
        }
        return user;
    }

    private comparePassword = (
        password: string,
        hash: string,
    ): Promise<boolean> => {
        return compare(password, hash);

    };
}