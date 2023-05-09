import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginBodyDto {
  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  password: string;
}

export class LoginWithGoogleBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  accessToken: string;
}

export class LoginWithFacebookBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  userID: string;

  @ApiProperty()
  @IsNotEmpty()
  accessToken: string;
}
