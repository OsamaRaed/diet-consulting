import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Question} from "../question/question.model";



@Table({tableName: "Answer", underscored: true})
export class Answer extends Model {

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.JSON, allowNull: false})
    recommendations: string[];

    @Column({type: DataType.BOOLEAN, allowNull: false})
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
}