import { ProvidersEnum } from '../../common/enums/providersEnum';
import {Vote} from "./vote.model";

export const VoteProviders = [
    {
        provide: ProvidersEnum.VOTE,
        useValue: Vote,
    },
];
