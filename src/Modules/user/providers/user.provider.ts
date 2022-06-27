import { PROVIDERS } from '../../../common/enums/providers';
import { User } from '../user.model';

export const UserProviders = [
    {
        provide: PROVIDERS.USER,
        useValue: User,
    },
];
