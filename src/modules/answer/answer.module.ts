import {Module} from "@nestjs/common";
import {AnswerController} from "./answer.controller";
import {AnswerService} from "./answer.service";
import {AnswerProvider} from "./answer.provider";
import {UserModule} from "../user/user.module";


@Module({
    imports: [
        UserModule,
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