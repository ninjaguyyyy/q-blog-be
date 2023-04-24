import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
