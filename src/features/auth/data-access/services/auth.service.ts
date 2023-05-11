import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosError } from 'axios';
import * as bcrypt from 'bcryptjs';
import { catchError, firstValueFrom } from 'rxjs';
import { ERROR_MESSAGE } from 'src/features/auth/constants/auth.constant';
import {
  LoginWithFacebookBodyDto,
  LoginWithGoogleBodyDto,
} from 'src/features/auth/data-access/dto/login.dto';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
import { JwtPayloadType } from 'src/features/auth/types/jwtPayload.type';
import { hashPassword } from 'src/features/auth/utils/auth.util';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { UserService } from 'src/features/users/data-access/services/user.service';
import { SocialUserBodyDto } from 'src/features/users/dto/user-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
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

  async loginWithGoogle({ accessToken }: LoginWithGoogleBodyDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          params: {
            access_token: accessToken,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw new UnauthorizedException();
          }),
        ),
    );

    const userPayload: SocialUserBodyDto = {
      socialId: data.sub,
      avatar: data.picture,
      name: data.name,
      email: data.email,
    };

    const user = await this.userService.upsertSocialUser(data.sub, userPayload);

    const payload: JwtPayloadType = {
      _id: user._id.toString(),
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async loginWithFacebook({ userID, accessToken }: LoginWithFacebookBodyDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://graph.facebook.com/v2.11/${userID}/`, {
          params: {
            access_token: accessToken,
            fields: 'name,id,picture.type(large),email',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    const userPayload: SocialUserBodyDto = {
      socialId: data.id,
      avatar: data.picture.data.url,
      name: data.name,
    };

    const user = await this.userService.upsertSocialUser(data.id, userPayload);

    const payload: JwtPayloadType = {
      _id: user._id.toString(),
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async signUp(payload: SignUpBodyDto) {
    const { username, password } = payload;

    const user = await this.userService.findUserByUsername(username);

    if (user) {
      throw new HttpException(
        ERROR_MESSAGE.ALREADY_USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(password);
    const userPayload = { username, password: hashedPassword };

    return this.userService.createUser(userPayload);
  }
}
