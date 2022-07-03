import {Body, Controller, Post, UseInterceptors} from "@nestjs/common";
import {LoginDto} from "../dto/login.dto";
import {SignUpDto} from "../dto/sign-up.dto";
import {ROLES} from "../../../common/enums/roles";
import {UserService} from "../user.service";
import {ApiTags} from "@nestjs/swagger";
import {Public} from "../../../common/decorators/public-route.decorator";
import {TransactionInterceptor} from "../../../common/interceptors/transaction";

@ApiTags('auth')
@Controller("auth")
// @UseInterceptors(TransactionInterceptor)
export class AuthController {
    
    constructor(private readonly userService: UserService) {
    }

    @Public()
    @Post("signup/patient")
    async signupUser(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.PATIENT);
    }

    @Public()
    @Post("signup/consultant")
    async signupConsultant(@Body() body: SignUpDto) {
        return this.userService.signup(body,ROLES.CONSULTANT);
    }

    @Public()
    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.userService.login(body);
    }
}
