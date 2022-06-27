import {ConfigService} from '@nestjs/config';
import {Sequelize} from 'sequelize-typescript';
import {User} from '../users/user.model';
import {DATABASE_CONFIG} from 'src/common/constants';
import {PROVIDERS} from '../../common/enums/providers';

export const databaseProviders = [
    {
        provide: PROVIDERS.DATABASE_CONNECTION,
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                ...configService.get(DATABASE_CONFIG),
            });
            await sequelize.addModels([User]);
            return sequelize;
        },
        inject: [ConfigService],
    },
];
