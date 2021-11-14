import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/modules/categories/category.schema';
import { Series } from 'src/modules/series/series.schema';

export class UpdatePostDto {
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
  categories: Category[];

  @ApiProperty()
  @IsOptional()
  series?: Series[];
}
