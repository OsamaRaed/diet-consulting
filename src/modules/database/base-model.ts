import {AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey} from "sequelize-typescript";
import {User} from "../user/user.model";


export abstract class BaseModel extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column({primaryKey: true, autoIncrement: true})
    id: number;


    @Column({type: DataType.DATE})
    createdAt: Date;

    @Column({type: DataType.DATE})
    updatedAt: Date;


    @Column({type: DataType.DATE})
    deletedAt: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    createdBy: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    updatedBy: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    deletedBy: number;
}