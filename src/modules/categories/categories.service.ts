import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  getAll() {
    return this.categoryModel.find().lean().exec();
  }

  async getById(id: string) {
    const category = await this.categoryModel.findById(id).lean().exec();
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  create(category: CategoryDto) {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async update(id: string, category: CategoryDto) {
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

    return null;
  }
}
