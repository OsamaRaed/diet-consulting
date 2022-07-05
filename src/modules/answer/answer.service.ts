import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {AnswerNotFound, DraftAlreadyExists} from "../../common/utils/errors";
import {Answer} from "./answer.model";
import {Op, Transaction} from "sequelize";
import {UpdateAnswerDto} from "./dto/update-answer.dto";


@Injectable()
export class AnswerService {
    constructor(
        @Inject(ProvidersEnum.ANSWER)
        private readonly answer: typeof Answer
    ) {
    }


    async createAnswer(createAnswerDto: CreateAnswerDto,
                       userId: string,
                       transaction: Transaction): Promise<Answer> {
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
        try {
            return await this.answer.create({...createAnswerDto, userId}, {transaction});
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }


    async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto, userId: string, transaction: Transaction) {
        const answer = await this.answer.findOne(
            {where: {id, userId}})
        if (!answer) {
            throw AnswerNotFound;
        }
        if (!updateAnswerDto.isDraft && answer.isDraft) {
            await answer.update({...updateAnswerDto, updatedBy: userId, answer, createdAt: new Date()}, {transaction});
            return answer;
        }
        await answer.update({...updateAnswerDto, updatedBy: userId, answer}, {transaction});
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
        return answer
    }

    async verifyAnswer(id: string, transaction: Transaction) {
        const answer = await this.answer.findOne(
            {where: {id}})
        if (!answer) {
            throw AnswerNotFound;
        }
        await answer.update({verified: true}, {transaction});
        return answer
    }
}