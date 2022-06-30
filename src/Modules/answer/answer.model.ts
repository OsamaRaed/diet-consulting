import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Question} from "../question/question.model";



@Table({tableName: "recommendations"})
export class Answer extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    recommendations: string;

    @Column
    isDraft: boolean;

    @Column
    @ForeignKey(() => User)
    userId: number;

    @Column
    @ForeignKey(() => Question)
    questionId: number;


    @BelongsTo(() => Question)
    question: Question;


    @BelongsTo(() => User)
    user: User;
}