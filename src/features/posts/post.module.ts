import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/features/auth/auth.module';
import { PostRepository } from 'src/features/posts/data-access/repositories/post.repository';
import { PostsService } from 'src/features/posts/data-access/services/post.service';
import {
  Post,
  PostSchema,
} from 'src/features/posts/data-access/schemas/post.schema';
import { PostsController } from 'src/features/posts/post.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AuthModule,
  ],
  providers: [PostsService, PostRepository],
  controllers: [PostsController],
})
export class PostsModule {}
