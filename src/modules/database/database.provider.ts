import {ConfigService} from '@nestjs/config';
import {Sequelize} from 'sequelize-typescript';
import {User} from '../user/user.model';
import {DATABASE_CONFIG} from 'src/common/constants';
import {ProvidersEnum} from '../../common/enums/providersEnum';
import {Question} from "../question/question.model";
import {Answer} from "../answer/answer.model";

export const databaseProviders = [
    {
        provide: ProvidersEnum.DATABASE_CONNECTION,
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
