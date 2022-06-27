import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";
import {UserProviders} from "./providers/user.provider";
import {UserService} from "./providers/user.service";

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...UserProviders],
    controllers: [UsersController, AuthController],
    exports: [UserService]
})

export class UserModule {
}
