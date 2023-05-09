import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LoginBodyDto,
  LoginWithFacebookBodyDto,
  LoginWithGoogleBodyDto,
} from 'src/features/auth/data-access/dto/login.dto';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
import { AuthService } from 'src/features/auth/data-access/services/auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginBodyDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login-with-google')
  @ApiBody({ type: LoginWithGoogleBodyDto })
  async loginWithGoogle(@Body() payload: LoginWithGoogleBodyDto) {
    return this.authService.loginWithGoogle(payload);
  }

  @Post('login-with-facebook')
  @ApiBody({ type: LoginWithFacebookBodyDto })
  async loginWithFacebook(@Body() payload: LoginWithFacebookBodyDto) {
    return this.authService.loginWithFacebook(payload);
  }

  @Post('sign-up')
  @ApiBody({ type: LoginBodyDto })
  async signUp(@Body() payload: SignUpBodyDto) {
    return this.authService.signUp(payload);
  }
}
