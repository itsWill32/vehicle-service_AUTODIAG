// autodiag-vehicle-service/src/infrastructure/shared/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // En un microservicio "consumidor", solo validamos el payload del token.
  // No necesitamos (ni debemos) revisar la base de datos de 'auth-service'.
  async validate(payload: any) {
    // El payload ya fue validado por Passport usando el JWT_SECRET
    // y contiene: { sub, email, role }
    
    // Simplemente retornamos el objeto que estará disponible en req.user
    return {
      userId: payload.sub, // 'sub' (subject) es el ID del usuario
      email: payload.email,
      role: payload.role,
    };
  }
}