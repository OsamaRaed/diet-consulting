import {Body, Controller, Post} from "@nestjs/common";
import {LoginDto} from "../dto/login.dto";
import {SignUpDto} from "../dto/sign-up.dto";
import {ROLES} from "../../../common/enums/roles";
import {UserService} from "../providers/user.service";

@Controller("auth")
export class AuthController {
    
    constructor(private readonly userService: UserService) {
    }

    @Post("signup/patient")
    async signupUser(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.PATIENT);
    }

    @Post("signup/consultant")
    async signupConsultant(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.CONSULTANT);
    }

    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.userService.login(body);
    }
}
