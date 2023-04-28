import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Category } from 'src/features/categories/data-access/schemas/category.schema';

export class GetPostsQueryDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

export class CreatePostBodyDto {
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
  @IsOptional()
  categories?: string[];
}

export class UpdatePostBodyDto {
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
}
