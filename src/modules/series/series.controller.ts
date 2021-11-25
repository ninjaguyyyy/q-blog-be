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
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() series: SeriesDto) {
    return this.seriesService.create(series);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateSeries(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() series: SeriesDto,
  ) {
    return this.seriesService.update(id, series);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteSeries(@Param('id', ParseObjectIdPipe) id: string) {
    return this.seriesService.delete(id);
  }
}
