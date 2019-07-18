import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) { }
    
    async signUp(credentials:AuthCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(credentials);
    }
    
    async signIn(credentials: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(credentials);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
         }
     }
}
