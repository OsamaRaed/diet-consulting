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
                [sequelize.fn('count', sequelize.col('answers.question_id')), 'totalAnswers'],
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
            }],
            group: ['Question.id'],
            order: [
                [sequelize.col('totalAnswers'), 'ASC']
            ],
            // limit: limit,
            // offset: offset * limit,
        }
    }
}))

@Table({paranoid:true, tableName: "Question", underscored: true})
export class Question extends BaseModel {





    @Column({allowNull: false, type: DataType.STRING})
    title: string;

    @Column({allowNull: false, type: DataType.STRING})
    description: string;


    @ForeignKey(() => User)
    @Column({allowNull: false, type: DataType.INTEGER})
    userId: number;


    @HasMany(() => Answer)
    answers: Answer[];


}
