import { ProvidersEnum } from '../../common/enums/providersEnum';
import { User } from './user.model';

export const UserProviders = [
    {
        provide: ProvidersEnum.USER,
        useValue: User,
    },
];
