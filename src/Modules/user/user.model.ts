import {Table, Column, Model, DataType} from "sequelize-typescript";

@Table({tableName: "users"})
export class User extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    email: string;

    @Column
    userName: string;

    @Column
    firstName: string;

    @Column({allowNull: true, type: DataType.STRING})
    middleName: string;

    @Column
    lastName: string;

    @Column
    password: string;
}
