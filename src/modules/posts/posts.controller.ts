import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostPostDto } from './dto/post.post.dto';
import { ParseObjectIdPipe } from './pipes/parse-objectId.pipe';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() payload: PostPostDto) {
    await this.postsService.create(payload);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  patchProfile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: PostPostDto,
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
