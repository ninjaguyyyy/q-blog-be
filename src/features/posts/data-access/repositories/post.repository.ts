import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreatePostBodyDto,
  GetPostsQueryDto,
  UpdatePostBodyDto,
} from 'src/features/posts/data-access/dto/post-request.dto';
import { PostDocument } from 'src/features/posts/data-access/schemas/post.schema';
import { Post } from 'src/features/posts/data-access/schemas/post.schema';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async getPosts(options: GetPostsQueryDto) {
    const { page = 1, limit = 0, search } = options;

    let filters: FilterQuery<PostDocument> = {};
    search &&
      (filters = {
        $or: [
          { title: new RegExp(search, 'i') },
          { content: new RegExp(search, 'i') },
        ],
      });

    const posts = await this.postModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('categories')
      .lean()
      .exec();

    const total = await this.postModel.count(filters).exec();

    return { posts, total };
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).lean().exec();

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async getPostBySlug(slug: string): Promise<Post> {
    const post = await this.postModel.findOne({ slug }).lean().exec();

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async create(payload: CreatePostBodyDto): Promise<Post> {
    const createdPost = new this.postModel(payload);
    return createdPost.save();
  }

  async update(id: string, payload: UpdatePostBodyDto): Promise<Post> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, payload, {
        new: true,
      })
      .lean()
      .exec();

    if (!updatedPost) {
      throw new NotFoundException(
        'The post with that id does not exist in the system. Please try another id.',
      );
    }

    return updatedPost;
  }

  async delete(id: string): Promise<null> {
    const removedPost = await this.postModel.findByIdAndRemove(id).exec();

    if (!removedPost) {
      throw new NotFoundException(
        'The post with that id does not exist in the system. Please try another id.',
      );
    }

    return null;
  }
}
