import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ERROR_MESSAGE } from 'src/features/auth/constants/auth.constant';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
import { JwtPayloadType } from 'src/features/auth/types/jwtPayload.type';
import { hashPassword } from 'src/features/auth/utils/auth.util';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { UserService } from 'src/features/users/data-access/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
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

  async signUp(payload: SignUpBodyDto) {
    const { username, password } = payload;

    const user = await this.usersService.findUserByUsername(username);

    if (user) {
      throw new HttpException(
        ERROR_MESSAGE.ALREADY_USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(password);
    const userPayload = { username, password: hashedPassword };

    return this.usersService.createUser(userPayload);
  }
}
