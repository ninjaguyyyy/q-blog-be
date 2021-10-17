import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtPayloadType } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    return isMatch ? { _id: user._id, role: user.role } : null;
  }

  async login(user: User) {
    const payload: JwtPayloadType = {
      _id: user._id.toString(),
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
