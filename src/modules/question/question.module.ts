import { Module } from "@nestjs/common";
import {QuestionService} from "./question.service";
import {QuestionController} from "./question.controller";
import {QuestionProvider} from "./question.provider";
import {UserModule} from "../user/user.module";

@Module({
    imports: [UserModule],
    providers: [QuestionService, ...QuestionProvider],
    controllers: [QuestionController],
    exports: [QuestionService]
})

export class QuestionModule {
}
