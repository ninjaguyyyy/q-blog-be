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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/features/ability/ability.decorator';
import { Action } from 'src/features/ability/ability.factory';
import { AbilityGuard } from 'src/features/ability/ability.guard';
import {
  CreatePostBodyDto,
  GetPostsQueryDto,
  UpdatePostBodyDto,
} from 'src/features/posts/data-access/dto/post-request.dto';
import { PostResponseDto } from 'src/features/posts/data-access/dto/post-response.dto';
import { Post as PostModel } from 'src/features/posts/data-access/schemas/post.schema';
import { PostsService } from 'src/features/posts/data-access/services/post.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';

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

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: PostModel })
  @ApiBearerAuth()
  @Post()
  createPost(@Body() payload: CreatePostBodyDto) {
    return this.postsService.createPost(payload);
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: PostModel })
  @ApiBearerAuth()
  @Patch(':id')
  patchProfile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdatePostBodyDto,
  ) {
    return this.postsService.updatePost(id, payload);
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: PostModel })
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  deletePost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.delete(id);
  }
}
