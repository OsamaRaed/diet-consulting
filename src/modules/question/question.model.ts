import {
    Table,
    Column,
    ForeignKey,
    HasMany,
    DataType,
    Scopes
} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Answer} from "../answer/answer.model";
import {BaseModel} from "../database/base-model";
import sequelize, {Op} from "sequelize";

@Table({tableName: "Question", underscored: true})
export class Question extends BaseModel {


    @Scopes(() => ({
        oneQuestion: {
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
        },
        withAnswers(limit: number, offset: number, userId: string,) {
            return {
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
            }
        }
    }))


    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;


    @HasMany(() => Answer)
    answers: Answer[];
}
