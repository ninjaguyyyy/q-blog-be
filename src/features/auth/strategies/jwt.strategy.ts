import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from '../types/jwtPayload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: 'test' || configService.get('JWT_SECRET'),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadType) {
    return { _id: payload._id, role: payload.role };
  }
}
