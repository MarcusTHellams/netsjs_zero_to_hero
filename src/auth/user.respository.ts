import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
const bcrypt = require('bcrypt');
const saltRounds = 10;


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(credentials:AuthCredentialsDto):Promise<void> { 
        const { username, password } = credentials;
        const user = new User();
        const encrypted = await bcrypt.hash(password, saltRounds);
        user.username = username;
        user.password = encrypted;
        await user.save();
    }
    
}