import {Table, Column, Model, ForeignKey} from "sequelize-typescript";
import {User} from "../user/user.model";

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

}
