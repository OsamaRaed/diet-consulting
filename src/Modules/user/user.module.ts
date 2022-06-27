import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import {UserProviders} from "./providers/user.provider";
import {UserService} from "./providers/user.service";

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...UserProviders],
    controllers: [AuthController],
    exports: [UserService]
})

export class UserModule {
}
