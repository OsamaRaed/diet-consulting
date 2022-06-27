import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./Modules/database/database.module";
import {UserModule} from "./Modules/user/user.module";
import {ConfigModule} from "@nestjs/config";
import configFile from '../config';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
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
