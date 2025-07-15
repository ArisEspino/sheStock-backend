import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//validar el token.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
