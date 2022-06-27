import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {UserService} from "./Modules/user/providers/user.service";
import {ValidationPipe} from "@nestjs/common";
import {AuthGuard} from "./common/guards/auth.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const userService = app.get(UserService);
    // app.useGlobalGuards(
    //     new AuthGuard(userService,  app.get(ConfigService)),
    // );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    await app.listen(3000);
}

bootstrap();
