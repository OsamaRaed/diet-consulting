import {Inject, Injectable} from "@nestjs/common";
import {ProvidersEnum} from "../../common/enums/providersEnum";
import {Question} from "./question.model";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {QuestionNotFound} from "../../common/utils/errors";
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {Transaction} from "sequelize";


@Injectable()
export class QuestionService {
    constructor(
        @Inject(ProvidersEnum.QUESTION)
        private readonly questionModel: typeof Question
    ) {
    }

    async createQuestion(dto: CreateQuestionDto, userId: string, transaction: Transaction) {
        return await this.questionModel.create({
            userId: userId,
            title: dto.title,
            description: dto.description,
            createdBy: userId,
        }, {transaction});
    }

    async getOneQuestion(questionId: number) {
        const question = await this.questionModel.scope('oneQuestion').findOne({
            where: {
                id: questionId
            },
        });
        if (!question) {
            throw QuestionNotFound;
        }
        return question;
    }

    async getQuestions(limit: number, offset: number, userId: string) {
        const questions = await this.questionModel
            .scope({ method: ['withAnswers',limit,offset,userId]}).findAll();
        return {
            data: questions
        }
    }

    async updateQuestion(questionId: string, updateQuestionDto: UpdateQuestionDto, userId: string,transaction: Transaction): Promise<Question> {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId,
                userId: userId
            }
        });
        if (!question) {
            throw QuestionNotFound;
        }
        await question.update({...updateQuestionDto, updatedAt: new Date(), updatedBy: userId}, {transaction});
        return question
    }

    async deleteQuestion(questionId: string, userId: string) {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId,
                userId: userId
            }
        });
        if (!question) {
            throw QuestionNotFound;
        }
        await question.update({deletedAt: new Date(), deletedBy: userId});
        return question
    }
}

