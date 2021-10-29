import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../posts/pipes/parse-objectId.pipe';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.getById(id);
  }

  @Post()
  createCategory(@Body() category: CategoryDto) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
