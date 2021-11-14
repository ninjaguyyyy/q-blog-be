import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

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

  @ApiProperty()
  @IsMongoId({ each: true })
  categories: string[];

  @ApiProperty()
  @IsMongoId({ each: true })
  @IsOptional()
  series?: string[];
}
