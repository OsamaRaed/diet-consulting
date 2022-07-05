import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import {UserProviders} from "./user.provider";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...UserProviders],
    controllers: [AuthController],
    exports: [UserService]
})

export class UserModule {
}
