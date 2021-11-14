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
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';
import { SeriesDto } from './dto/series.dto';
import { SeriesService } from './series.service';

@ApiTags('series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  getSeries() {
    return this.seriesService.getAll();
  }

  @Get(':id')
  async getSeriesById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.seriesService.getById(id);
  }

  @Post()
  createCategory(@Body() series: SeriesDto) {
    return this.seriesService.create(series);
  }

  @Put(':id')
  async updateSeries(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() series: SeriesDto,
  ) {
    return this.seriesService.update(id, series);
  }

  @Delete(':id')
  async deleteSeries(@Param('id', ParseObjectIdPipe) id: string) {
    return this.seriesService.delete(id);
  }
}
