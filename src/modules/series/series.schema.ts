import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type SeriesDocument = Series & Document;

@Schema()
export class Series {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
