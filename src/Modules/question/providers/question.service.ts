import {Inject, Injectable} from "@nestjs/common";
import {PROVIDERS} from "../../../common/enums/providers";
import {Question} from "../question.model";
import {CreateQuestionDto} from "../dto/create-question.dto";
import {MESSAGES} from "../../../common/enums/messages";
import {Answer} from "../../answer/answer.model";


@Injectable()
export class QuestionService {
    constructor(
        @Inject(PROVIDERS.QUESTION)
        private readonly questionModel: typeof Question
    ) {
    }

    async createQuestion(dto: CreateQuestionDto, userId: string) {
        await this.questionModel.create({
            userId: userId,
            title: dto.title,
            description: dto.description,
        })
        return {
            message: MESSAGES.QUESTION_CREATED
        }
    }

    async getQuestions(limit: number, offset: number) {
        const questions = await this.questionModel.findAll({
            offset: offset,
            limit: limit,
        });
        return {
            data: questions
        }
    }

    async getOneQuestion(questionId: string) {
        const question = await this.questionModel.findOne({
            where: {
                id: questionId
            },
            include: [{
                model: Answer,
                where: {
                    isDraft: false
                }
            }],
        });
        return {
            data: question
        }
    }
}