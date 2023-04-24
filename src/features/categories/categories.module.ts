import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema';
import { CategoriesService } from 'src/features/categories/data-access/services/categories.service';
import { CategoryRepository } from 'src/features/categories/data-access/repositories/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesService, CategoryRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
