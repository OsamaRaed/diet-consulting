import {Module} from '@nestjs/common';
import {VoteService} from './vote.service';
import {VoteController} from './vote.controller';
import {VoteProviders} from "./vote.providor";
import {DatabaseModule} from "../database/database.module";

@Module({

    imports: [DatabaseModule],
    controllers: [VoteController],
    providers: [VoteService, ...VoteProviders],
})
export class VoteModule {
}
