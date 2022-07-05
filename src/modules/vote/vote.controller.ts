import {Controller, Post, Body, Param, Delete, UseInterceptors} from '@nestjs/common';
import {VoteService} from './vote.service';
import {VoteDto} from "./dto/vote.dto";
import {UserIdentity} from "../../common/decorators/user.decorator";
import {IUserIdentity} from "../user/interfaces/user-idnentity.interface";
import {TransactionInterceptor} from "../../common/interceptors/transaction";
import {Transaction} from "sequelize";
import {TransactionParam} from "../../common/decorators/transaction.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";


@Controller('votes')
@ApiTags('votes')
@ApiBearerAuth()
export class VoteController {
    constructor(private readonly votesService: VoteService) {
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
