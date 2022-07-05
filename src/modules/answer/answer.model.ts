import {BelongsTo, Column, DataType, DefaultScope, ForeignKey, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Question} from "../question/question.model";
import {BaseModel} from "../database/base-model";
import {DEFAULT_TIMESTAMP} from "../../common/constants";

@DefaultScope({
    attributes: {
        exclude: ['deletedAt', 'deletedBy'],
    },
})

@Table({paranoid: true, tableName: "Answer", underscored: true})
export class Answer extends BaseModel {

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    recommendations: string;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: true})
    isDraft: boolean;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    userId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Question)
    questionId: number;


    @BelongsTo(() => Question)
    question: Question;


    @BelongsTo(() => User)
    user: User;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    verified: boolean;


    @Column({type: DataType.DATE, defaultValue: DEFAULT_TIMESTAMP})
    createdAt: Date;


}