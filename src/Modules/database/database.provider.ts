import {ConfigService} from '@nestjs/config';
import {Sequelize} from 'sequelize-typescript';
import {User} from '../user/user.model';
import {DATABASE_CONFIG} from 'src/common/constants';
import {PROVIDERS} from '../../common/enums/providers';
import {Question} from "../question/question.model";
import {Answer} from "../answer/answer.model";

export const databaseProviders = [
    {
        provide: PROVIDERS.DATABASE_CONNECTION,
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                ...configService.get(DATABASE_CONFIG),
                define: {
                    timestamps: false
                },
            });
            await sequelize.addModels([User, Question, Answer]);
            return sequelize;
        },
        inject: [ConfigService],
    },
];
