import {Table, Column, DataType, DefaultScope} from "sequelize-typescript";
import {BaseModel} from "../database/base-model";
import {RolesEnum} from "../../common/enums/rolesEnum";

@DefaultScope({
    attributes: {
        exclude: ['deletedAt', 'deletedBy'],
    },
})

@Table({paranoid:true, tableName: "User", underscored: true})
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

    @Column({type: DataType.ENUM(RolesEnum.PATIENT, RolesEnum.CONSULTANT), allowNull: false})
    role: string;
}
