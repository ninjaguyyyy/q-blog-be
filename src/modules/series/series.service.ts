import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeriesDto } from './dto/series.dto';
import { Series, SeriesDocument } from './series.schema';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<SeriesDocument>,
  ) {}

  getAll() {
    return this.seriesModel.find().lean().exec();
  }

  async getById(id: string) {
    const series = await this.seriesModel.findById(id).lean().exec();
    if (!series) {
      throw new NotFoundException();
    }
    return series;
  }

  create(series: SeriesDto) {
    const createdSeries = new this.seriesModel(series);
    return createdSeries.save();
  }

  async update(id: string, series: SeriesDto) {
    const updatedSeries = await this.seriesModel
      .findByIdAndUpdate(id, series)
      .setOptions({ overwrite: true, new: true })
      .lean()
      .exec();
    if (!updatedSeries) {
      throw new NotFoundException();
    }
    return updatedSeries;
  }

  async delete(id: string) {
    const removedSeries = await this.seriesModel.findByIdAndRemove(id).exec();

    if (!removedSeries) {
      throw new NotFoundException();
    }

    return null;
  }
}
