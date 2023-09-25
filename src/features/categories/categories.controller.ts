import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/features/ability/ability.decorator';
import { Action } from 'src/features/ability/ability.factory';
import { AbilityGuard } from 'src/features/ability/ability.guard';
import { CategoryBodyDto } from 'src/features/categories/data-access/dto/category-request.dto';
import { Category } from 'src/features/categories/data-access/schemas/category.schema';
import { CategoriesService } from 'src/features/categories/data-access/services/categories.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';

@ApiTags('categories')
@Controller('api/categories')
@UseInterceptors(CacheInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @CacheKey('custom_key')
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  getCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: Category })
  createCategory(@Body() category: CategoryBodyDto) {
    return this.categoriesService.create(category);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: Category })
  updateCategory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CategoryBodyDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: Category })
  deleteCategory(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
