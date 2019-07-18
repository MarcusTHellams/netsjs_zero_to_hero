import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'int',
        name:'id'
    })
    id: number;
    
    @Column({
        type: 'varchar',
        length: 255,
        name: 'username'
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'password'
    })
    password: string


    
}