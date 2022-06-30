import {Table, Column, Model, ForeignKey, HasMany} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Answer} from "../answer/answer.model";

@Table({tableName: "questions"})
export class Question extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    title: string;

    @Column
    description: string;


    @ForeignKey(() => User)
    @Column
    userId: number;


    @HasMany(() => Answer)
    answers: Answer[];
}
