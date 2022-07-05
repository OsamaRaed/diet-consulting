import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import {VoteProviders} from "./vote.providor";

@Module({

  controllers: [VotesController],
  providers: [VotesService,...VoteProviders],
})
export class VotesModule {}
