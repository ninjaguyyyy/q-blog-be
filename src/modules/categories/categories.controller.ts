import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() category: CategoryDto) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
