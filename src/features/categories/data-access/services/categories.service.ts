import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CategoryBodyDto } from 'src/features/categories/data-access/dto/category-request.dto';
import { CategoryRepository } from 'src/features/categories/data-access/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll() {
    const categories = await this.categoryRepository.getAll();
    console.log('call service');
    return categories;
  }

  async getById(id: string) {
    const category = await this.categoryRepository.getById(id);
    return category;
  }

  async create(category: CategoryBodyDto) {
    const createdCategory = await this.categoryRepository.create(category);
    return createdCategory;
  }

  async update(id: string, category: CategoryBodyDto) {
    const updatedCategory = await this.categoryRepository.update(id, category);
    return updatedCategory;
  }

  async delete(id: string) {
    const removedCategory = await this.categoryRepository.delete(id);
    return removedCategory;
  }

  // @Cron('45 * * * * *')
  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron() {
    Logger.log('Called when the current second is 45');
  }
}
