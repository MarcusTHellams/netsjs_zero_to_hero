import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService:JwtService) { }
    
    async signUp(credentials:AuthCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(credentials);
    }
    
    async signIn(credentials: AuthCredentialsDto): Promise<{ accessToken:string}> {
        const username = await this.userRepository.validateUserPassword(credentials);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload: JwtPayload = {
            username
        }
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
     }
}
