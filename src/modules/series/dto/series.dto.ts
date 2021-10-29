import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SeriesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
