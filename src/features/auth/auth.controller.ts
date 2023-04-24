import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from 'src/features/auth/data-access/dto/login.dto';
import { AuthService } from 'src/features/auth/data-access/services/auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginBodyDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
