import {Body, Controller, Post, UseInterceptors} from "@nestjs/common";
import {LoginDto} from "../dto/login.dto";
import {SignUpDto} from "../dto/sign-up.dto";
import {UserService} from "../user.service";
import {ApiTags} from "@nestjs/swagger";
import {Public} from "../../../common/decorators/public-route.decorator";
import {TransactionInterceptor} from "../../../common/interceptors/transaction";
import {TransactionParam} from "../../../common/decorators/transaction.decorator";
import {Transaction} from "sequelize";

@ApiTags('auth')
@Controller("auth")
export class AuthController {

    constructor(private readonly userService: UserService) {
    }

    @UseInterceptors(TransactionInterceptor)
    @Public()
    @Post("signup")
    async signup(
        @Body() body: SignUpDto,
        @TransactionParam() transaction: Transaction) {
        return this.userService.signup(body, transaction);
    }

    @Public()
    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.userService.login(body);
    }
}
