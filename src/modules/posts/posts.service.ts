import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostPostPayload } from './payloads/post.post.payload';
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

  async create(payload: PostPostPayload): Promise<Post> {
    const createdPost = new this.postModel(payload);
    return createdPost.save();
  }
}
