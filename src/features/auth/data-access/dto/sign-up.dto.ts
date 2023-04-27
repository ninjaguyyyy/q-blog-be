import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  password: string;
}
