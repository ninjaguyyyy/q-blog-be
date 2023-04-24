import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayloadType } from 'src/features/auth/types/jwtPayload.type';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { UsersService } from 'src/features/users/data-access/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
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
