import {Table, Column, DataType} from "sequelize-typescript";
import {BaseModel} from "../database/base-model";
import {ROLES} from "../../common/enums/roles";

@Table({tableName: "User", underscored: true})
export class User extends BaseModel {


    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    username: string;

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @Column({allowNull: true, type: DataType.STRING})
    middleName: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.ENUM(ROLES.PATIENT, ROLES.CONSULTANT), allowNull: false})
    role: string;
}
