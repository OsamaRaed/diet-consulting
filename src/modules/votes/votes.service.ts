import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {VoteDto} from "./dto/vote.dto";
import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Vote} from "./vote.model";
import {Transaction} from "sequelize";

@Injectable()
export class VotesService {

    constructor(
        @Inject(ProvidersEnum.VOTE) private readonly voteModel: typeof Vote,
    ) {
    }

    async vote(voteDto: VoteDto, userId: string, transaction: Transaction) {
        const vote = await this.voteModel.findOne({
            where: {
                userId,
                answerId: voteDto.answerId,
            }
        });
        if (vote) {
            vote.vote = voteDto.vote;
            await vote.save();
            return vote;
        }
        try {
            return await this.voteModel.create({...voteDto, userId},{transaction});
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async remove(id: string, userId: string) {
        return await this.voteModel.destroy({where: {id, userId}});
    }
}
