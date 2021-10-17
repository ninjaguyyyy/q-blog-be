import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostPostDto } from './dto/post.post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Post[]> {
    console.log(this.configService.get('JWT_SECRET'));
    return this.postModel.find().exec();
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

  async update(id: string, payload: PostPostDto): Promise<Post> {
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
