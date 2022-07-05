import { Module } from "@nestjs/common";
import {QuestionService} from "./question.service";
import {QuestionController} from "./question.controller";
import {QuestionProvider} from "./question.provider";
import {UserModule} from "../user/user.module";
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [UserModule, DatabaseModule],
    providers: [QuestionService, ...QuestionProvider],
    controllers: [QuestionController],
    exports: [QuestionService]
})

export class QuestionModule {
}
