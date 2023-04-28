import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }],
  })
  parentCategory: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
