import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Task } from "src/tasks/task.entity";
const bcrypt = require('bcrypt');


@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    id: number;
    
    @Column({
        type: 'varchar',
        length: 255,
        name: 'username',
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'password'
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'salt'
    })
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    
    @OneToMany(type => Task, Task => Task.user, {eager:true})
    tasks: Task[];
    
}