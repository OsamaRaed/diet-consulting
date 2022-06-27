import {PROVIDERS} from "../../../common/enums/providers";
import {Inject, Injectable} from "@nestjs/common";
import {CreateAnswerDto} from "../dto/create-answer.dto";
import {MESSAGES} from "../../../common/enums/messages";
import {UnAuthorizedUser} from "../../../common/utils/errors";
import {Answer} from "../answer.model";


@Injectable()
export class AnswerService {
    constructor(
        @Inject(PROVIDERS.ANSWER)
        private readonly answer: typeof Answer
    ) {
    }


    async createAnswer(dto: CreateAnswerDto, userId: string) {
        await this.answer.create({
            userId: userId,
            questionId: dto.questionId,
            recommendations : dto.recommendations,
            title: dto.title,
            description: dto.description,
            isDraft: true
        })
        return {
            message: MESSAGES.ANSWER_CREATED
        }
    }

    async submitAnswer(recommendationId: string, userId: number) {
        const recommendation = await this.answer.findOne(
            {where: {id: recommendationId}})
        if (recommendation.userId !== userId) {
            throw UnAuthorizedUser;
        }
        recommendation.isDraft = false
        await recommendation.save()
        return {
            message: MESSAGES.ANSWER_SUBMITTED
        }
    }
}