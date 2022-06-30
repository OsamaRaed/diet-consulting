import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {RolesGuard} from "./common/guards/roles.guards";
import {ConfigService} from "@nestjs/config";
import {UserService} from "./Modules/user/providers/user.service";
import {AuthGuard} from "./common/guards/auth.guard";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    let userService = app.get(UserService);
    app.useGlobalGuards(
        new AuthGuard(userService, new Reflector(), app.get(ConfigService)),
        new RolesGuard(new Reflector()),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('Diet Consultant API')
        .setDescription('The Diet Consultant API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);



    await app.listen(3000);
}

bootstrap();
