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
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CategoriesService } from 'src/features/categories/data-access/services/categories.service';
import { CategoryBodyDto } from 'src/features/categories/data-access/dto/category-request.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  getCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() category: CategoryBodyDto) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateCategory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CategoryBodyDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
