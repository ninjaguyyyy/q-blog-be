import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostPostPayload } from './payloads/post.post.payload';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @Post()
  async createPost(@Body() payload: PostPostPayload) {
    await this.postsService.create(payload);
  }
}
