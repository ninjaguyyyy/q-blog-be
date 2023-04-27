import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePostBodyDto,
  GetPostsQueryDto,
  UpdatePostBodyDto,
} from 'src/features/posts/data-access/dto/post-request.dto';
import { PostRepository } from 'src/features/posts/data-access/repositories/post.repository';
import { Post } from 'src/features/posts/data-access/schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) {}

  async getPosts(options: GetPostsQueryDto) {
    const res = await this.postRepository.getPosts(options);
    return res;
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.getPostById(id);
    return post;
  }

  async createPost(payload: CreatePostBodyDto): Promise<Post> {
    const createdPost = this.postRepository.create(payload);
    return createdPost;
  }

  async updatePost(id: string, payload: UpdatePostBodyDto): Promise<Post> {
    const updatedPost = await this.postRepository.update(id, payload);
    return updatedPost;
  }

  async delete(id: string): Promise<null> {
    const removedPost = await this.postRepository.delete(id);
    return removedPost;
  }
}
