import {Module} from "@nestjs/common";
import {AnswerController} from "./answer.controller";
import {AnswerService} from "./providers/answer.service";
import {AnswerProvider} from "./providers/answer.provider";
import {DatabaseModule} from "../database/database.module";
import {UserModule} from "../user/user.module";


@Module({
    imports: [
        UserModule,
        DatabaseModule,
    ],
    controllers: [
        AnswerController,
    ],
    providers: [
        AnswerService,
        ...AnswerProvider,
    ],
    exports: [
        AnswerService,
    ],
})

export class AnswerModule {
}