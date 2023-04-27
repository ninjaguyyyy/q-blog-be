import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/features/users/data-access/contants/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
