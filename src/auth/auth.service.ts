import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginDto.email
            }
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        console.log(user.email);
        console.log(loginDto.email);

        if (!isMatch) {
            throw new UnauthorizedException("Credenciales invalidas");
        }

        const payload = { id: user.id, email: user.email };

        const token = this.jwtService.sign(payload);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
            },
            token
        };
    }
}
