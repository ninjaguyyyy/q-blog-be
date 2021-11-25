import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetPostsQueryParams } from './dto/getPosts-query.dto';
import { PostPostDto } from './dto/post.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() { page, limit, search }: GetPostsQueryParams) {
    return this.postsService.findAll(page, limit, search);
  }

  @Get(':id')
  async getPost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() payload: PostPostDto) {
    await this.postsService.create(payload);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  patchProfile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdatePostDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deletePost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.delete(id);
  }
}
