import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import {QuestionService} from "./providers/question.service";
import {QuestionController} from "./question.controller";
import {QuestionProvider} from "./providers/question.provider";
import {UserModule} from "../user/user.module";

@Module({
    imports: [DatabaseModule,UserModule],
    providers: [QuestionService, ...QuestionProvider],
    controllers: [QuestionController],
    exports: [QuestionService]
})

export class QuestionModule {
}
