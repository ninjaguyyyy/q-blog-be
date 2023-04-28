import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/features/categories/data-access/schemas/category.schema';

export class PostResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  publishedDate: Date;

  @ApiProperty()
  content: string;

  @ApiProperty()
  categories: Category[];
}
