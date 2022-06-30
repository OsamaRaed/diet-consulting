import {PROVIDERS} from "../../../common/enums/providers";
import {Inject, Injectable} from "@nestjs/common";
import {CreateAnswerDto} from "../dto/create-answer.dto";
import {MESSAGES} from "../../../common/enums/messages";
import {AnswerNotFound, DraftAlreadyExists, UnAuthorizedUser, UserNotFound} from "../../../common/utils/errors";
import {Answer} from "../answer.model";
import {Op} from "sequelize";


@Injectable()
export class AnswerService {
    constructor(
        @Inject(PROVIDERS.ANSWER)
        private readonly answer: typeof Answer
    ) {
    }


    async createAnswer(dto: CreateAnswerDto, userId: string) {
        const answer = await this.answer.findOne(
            {where: {
                [Op.and]: [
                    {userId: userId},
                    {questionId: dto.questionId},
                    {isDraft: true}
                ],
            }});
        if(answer) {
            throw DraftAlreadyExists
        }
        const createdAnswer = await this.answer.create({
            userId: userId,
            questionId: dto.questionId,
            recommendations: dto.recommendations,
            title: dto.title,
            description: dto.description,
            isDraft: true
        })
        return {
            message: MESSAGES.ANSWER_CREATED,
            data: createdAnswer
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
            message: MESSAGES.ANSWER_SUBMITTED,
            data: recommendation
        }
    }

    async updateAnswer(id: string, dto: CreateAnswerDto, userId: number) {
        const recommendation = await this.answer.findOne(
            {where: {id: id}})
        if(!recommendation) {
            throw AnswerNotFound;
        }

        if (recommendation.userId !== userId) {
            throw UnAuthorizedUser;
        }
        recommendation.recommendations = dto.recommendations
        recommendation.title = dto.title
        recommendation.description = dto.description
        await recommendation.save()
        return {
            message: MESSAGES.ANSWER_UPDATED,
            data: recommendation
        }
    }

    async deleteAnswer(id: string, userId: number) {
        const recommendation = await this.answer.findOne(
            {where: {id: id}})
        if(!recommendation) {
            throw AnswerNotFound;
        }

        if (recommendation.userId !== userId) {
            throw UnAuthorizedUser;
        }
        await recommendation.destroy()
        return {
            message: MESSAGES.ANSWER_DELETED,
            data: recommendation
        }
    }

    async getOneAnswer(id: string) {
        const recommendation = await this.answer.findOne(
            {where: {id: id}})
        if(!recommendation) {
            throw AnswerNotFound;
        }
        return {
            data: recommendation
        }
    }
}