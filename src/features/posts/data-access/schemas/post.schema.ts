import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Category } from 'src/features/categories/data-access/schemas/category.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop()
  isPublished: boolean;

  @Prop()
  publishedDate: Date;

  @Prop()
  content: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
