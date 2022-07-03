import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./modules/database/database.module";
import {UserModule} from "./modules/user/user.module";
import {ConfigModule} from "@nestjs/config";
import configFile from '../config';
import {QuestionModule} from "./modules/question/question.module";
import {AnswerModule} from "./modules/answer/answer.module";

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        QuestionModule,
        AnswerModule,
        ConfigModule.forRoot({
            load: [configFile],
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
