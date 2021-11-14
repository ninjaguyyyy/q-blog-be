import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PostPostDto } from './dto/post.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private configService: ConfigService,
  ) {}

  async findAll(page = 1, limit = 0, search?: string) {
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
      .lean()
      .exec();

    const total = await this.postModel.count().exec();

    return { posts, total };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).lean().exec();
    // .populate('categories')
    // .populate('series');
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async create(payload: PostPostDto): Promise<Post> {
    const createdPost = new this.postModel(payload);
    return createdPost.save();
  }

  async update(id: string, payload: UpdatePostDto): Promise<Post> {
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
