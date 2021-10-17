import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class PostPostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  @IsDateString()
  publishDate: Date;

  @ApiProperty()
  content: string;
}
