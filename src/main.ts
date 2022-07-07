import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from "@nestjs/config";
import {UserService} from "./modules/user/user.service";
import {AuthGuard, RolesGuard} from "./common/guards";
import {CustomLogger} from "./common/logger";


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new CustomLogger(),
    });
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
