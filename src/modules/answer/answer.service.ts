import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Inject, Injectable} from "@nestjs/common";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {MessagesEnum} from "../../common/enums/messagesEnum";
import {AnswerNotFound, DraftAlreadyExists, UnAuthorizedUser} from "../../common/utils/errors";
import {Answer} from "./answer.model";
import {Op} from "sequelize";
import {UpdateAnswerDto} from "./dto/update-answer.dto";


@Injectable()
export class AnswerService {
    constructor(
        @Inject(ProvidersEnum.ANSWER)
        private readonly answer: typeof Answer
    ) {
    }


    async createAnswer(createAnswerDto: CreateAnswerDto, userId: string): Promise<Answer> {
        const answer = await this.answer.findOne(
            {
                where: {
                    [Op.and]: [
                        {userId: userId},
                        {questionId: createAnswerDto.questionId},
                        {isDraft: true}
                    ],
                }
            });
        if (answer) {
            throw DraftAlreadyExists
        }
        return await this.answer.create({
            userId: userId,
            questionId: createAnswerDto.questionId,
            recommendations: createAnswerDto.recommendations,
            title: createAnswerDto.title,
            description: createAnswerDto.description,
            createdBy: userId,
            isDraft: true
        })
    }


    async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto, userId: string) {
        const answer = await this.answer.findOne(
            {where: {id, userId}})
        if (!answer) {
            throw AnswerNotFound;
        }
        await answer.update({...updateAnswerDto, updatedBy: userId});
        return answer
    }

    async deleteAnswer(id: string, userId: string): Promise<Answer> {
        const answer = await this.answer.findOne(
            {where: {id, userId}})
        if (!answer) {
            throw AnswerNotFound;
        }
        await answer.update({deletedBy: userId, deletedAt: new Date()});
        return answer
    }

    async getOneAnswer(id: string) {
        const answer = await this.answer.findOne(
            {where: {id: id}})
        if (!answer) {
            throw AnswerNotFound;
        }
        return  answer
    }
}