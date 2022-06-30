import {Body, Controller, Post} from "@nestjs/common";
import {LoginDto} from "../dto/login.dto";
import {SignUpDto} from "../dto/sign-up.dto";
import {ROLES} from "../../../common/enums/roles";
import {UserService} from "../providers/user.service";
import {ApiTags} from "@nestjs/swagger";
import {PublicRoute} from "../../../common/decorators/public-route.decorator";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    
    constructor(private readonly userService: UserService) {
    }

    @PublicRoute()
    @Post("signup/patient")
    async signupUser(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.PATIENT);
    }

    @PublicRoute()
    @Post("signup/consultant")
    async signupConsultant(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.CONSULTANT);
    }

    @PublicRoute()
    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.userService.login(body);
    }
}
