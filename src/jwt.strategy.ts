//Modulos de autenticacion
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'default_secret',
        });
    }
    async validate(payload: any) {
        const user = await this.userService.findById(payload.id);
        if (!user) throw new UnauthorizedException('Usuario no valido');
        return user;
    }
}