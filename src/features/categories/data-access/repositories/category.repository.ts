import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/features/categories/data-access/schemas/category.schema';
import { CategoryBodyDto } from 'src/features/categories/data-access/dto/category-request.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAll() {
    return this.categoryModel.find().populate('parentCategory').lean().exec();
  }

  async getById(id: string) {
    const category = await this.categoryModel.findById(id).lean().exec();
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async create(category: CategoryBodyDto) {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async update(id: string, category: CategoryBodyDto) {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, category)
      .setOptions({ overwrite: true, new: true })
      .lean()
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException();
    }
    return updatedCategory;
  }

  async delete(id: string) {
    const removedCategory = await this.categoryModel
      .findByIdAndRemove(id)
      .exec();

    if (!removedCategory) {
      throw new NotFoundException();
    }

    return removedCategory;
  }
}
