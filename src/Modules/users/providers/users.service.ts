import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../user.model";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

import * as dotenv from 'dotenv';

import { LoginDto } from "../dto/login.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { PROVIDERS } from "../common/enums/providers";

dotenv.config();

@Injectable()
export class UsersService {
    constructor(
        @Inject(PROVIDERS.USER) private readonly userModel: typeof User
    ) {
    }
    
    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({
            where: {
                email: email
            }
        });
    }
    
    async create(user: SignUpDto): Promise<void> {
        const existed = await this.findOne(user.email);
        if(existed){
            throw new ConflictException()
        }
        const hash = await bcrypt.hash(user.password, 10);
        await this.userModel.create({
            name: user.name,
            email: user.email,
            password: hash
        });
    }
    
    
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findOne(email);
        let valid = false;
        if (user) {
            valid = await this.comparePassword(pass, user.password)
        }
        return valid;
    }
    
    async login(user: LoginDto) {
        const payload = { email: user.email };
        const findUser = this.validateUser(user.email, user.password);
        console.log(findUser);

        if (!findUser) {
            throw new UnauthorizedException();
        }
        return {
            access_token: sign(payload, process.env.JWT_SECRET)
        };
    }
    
    async signup(user: any) {
        const payload = { name: user.name, email: user.email, password: user.password };
        await this.create(payload);
        return {
            message: "user created"
        };
    }
    
    private comparePassword = (
        password: string,
        hash: string,
    ): Promise<boolean> => {
        return compare(password, hash);
    };
}