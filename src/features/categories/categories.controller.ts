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
import { Action } from 'src/features/ability/ability.factory';
import { CheckAbilities } from 'src/features/ability/ability.decorator';
import { Category } from 'src/features/categories/data-access/schemas/category.schema';
import { AbilityGuard } from 'src/features/ability/ability.guard';

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
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: Category })
  createCategory(@Body() category: CategoryBodyDto) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
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
