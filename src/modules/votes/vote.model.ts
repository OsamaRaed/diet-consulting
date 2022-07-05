import {AutoIncrement, Column, DataType, ForeignKey, PrimaryKey, Table} from "sequelize-typescript";
import {BaseModel} from "../database/base-model";
import {Answer} from "../answer/answer.model";
import {User} from "../user/user.model";

@Table({paranoid: true, tableName: "Answer", underscored: true})
export class Vote extends BaseModel{

    @PrimaryKey
    @AutoIncrement
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Answer)
    @Column({type: DataType.INTEGER, allowNull: false})
    answerId: number;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.BOOLEAN, allowNull: false})
    vote: boolean;
}
