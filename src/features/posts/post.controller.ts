import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { PostsService } from 'src/features/posts/data-access/services/post.service';
import {
  CreatePostBodyDto,
  GetPostsQueryDto,
  UpdatePostBodyDto,
} from 'src/features/posts/data-access/dto/post-request.dto';
import { PostResponseDto } from 'src/features/posts/data-access/dto/post-response.dto';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() query: GetPostsQueryDto) {
    return this.postsService.getPosts(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: PostResponseDto })
  getPost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  createPost(@Body() payload: CreatePostBodyDto) {
    return this.postsService.createPost(payload);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  patchProfile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdatePostBodyDto,
  ) {
    return this.postsService.updatePost(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  deletePost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.delete(id);
  }
}
