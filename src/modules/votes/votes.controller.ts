import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors} from '@nestjs/common';
import {VotesService} from './votes.service';
import {VoteDto} from "./dto/vote.dto";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {TransactionInterceptor} from "../../common/interceptors/transaction";
import {Transaction} from "sequelize";
import {TransactionParam} from "../../common/decorators/transaction.decorator";


@Controller('votes')
export class VotesController {
    constructor(private readonly votesService: VotesService) {
    }

    @Post()
    @UseInterceptors(TransactionInterceptor)
    vote(@Body() createVoteDto: VoteDto,
         @TransactionParam() transaction: Transaction,
         @UserIdentity() user: IUserIdentity) {
        return this.votesService.vote(createVoteDto, user.id, transaction);
    }

    @Delete(':id')
    remove(@Param('id') id: string,
           @UserIdentity() user: IUserIdentity) {
        return this.votesService.remove(id, user.id);
    }
}
