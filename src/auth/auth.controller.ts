import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    async signUp(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<void> { 
        return await this.authService.signUp(credentials)
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<void> {
        return await this.authService.signIn(credentials)
    }
}
