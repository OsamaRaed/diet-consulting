import {Inject, Injectable} from "@nestjs/common";
import {PROVIDERS} from "../../../common/enums/providers";
import {Question} from "../question.model";
import {CreateQuestionDto} from "../dto/create-question.dto";
import {MESSAGES} from "../../../common/enums/messages";
import {Answer} from "../../answer/answer.model";
import sequelize, {Op} from "sequelize";
import {QuestionNotFound, UnAuthorizedUser} from "../../../common/utils/errors";
import {User} from "../../user/user.model";


@Injectable()
export class QuestionService {
    constructor(
        @Inject(PROVIDERS.QUESTION)
        private readonly questionModel: typeof Question
    ) {
    }

    async createQuestion(dto: CreateQuestionDto, userId: string) {
        const question = await this.questionModel.create({
            userId: userId,
            title: dto.title,
            description: dto.description,
        })
        return {
            message: MESSAGES.QUESTION_CREATED,
            data: question
        }
    }

    async getOneQuestion(questionId: number) {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId
            },
            include: [{
                model: Answer,
                required: false,
                where: {
                    isDraft: false
                },
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }],
            }],
        });
        if(!question) {
            throw QuestionNotFound;
        }
        return {
            data: question
        }
    }

    async getQuestions(limit: number, offset: number, userId: string) {
        const questions = await this.questionModel.findAll({
            attributes: [
                'id',
                'title',
                'description',
                [sequelize.fn('count', sequelize.col('answers.questionId')), 'totalAnswers'],
            ],
            include: [{
                model: Answer,
                required: false,
                duplicating: false,
                where: {
                    [Op.or]: [
                        {userId: userId},
                        {isDraft: false}]
                },
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }],
            }],
            group: ['Question.id'],
            order: [
                [sequelize.col('totalAnswers'), 'ASC']
            ],
            limit: limit,
            offset: offset * limit,
        });


        return {
            data: questions
        }
    }

    async updateQuestion(questionId: string, dto: CreateQuestionDto, userId: string) {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId
            }
        });
        if(!question) {
            throw QuestionNotFound;
        }
        if (question.userId != Number(userId)) {
            throw UnAuthorizedUser;
        }
        question.title = dto.title;
        question.description = dto.description;
        await question.save();
        return {
            message: MESSAGES.QUESTION_UPDATED,
            data: question
        }
    }

    async deleteQuestion(questionId: string, userId: string) {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId
            }
        });
        if(!question) {
            throw QuestionNotFound;
        }
        if (question.userId != Number(userId)) {
            throw UnAuthorizedUser;
        }
        await question.destroy();
        return {
            message: MESSAGES.QUESTION_DELETED,
            data: question
        }
    }
}

