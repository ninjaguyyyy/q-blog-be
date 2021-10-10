import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostPostPayload {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
