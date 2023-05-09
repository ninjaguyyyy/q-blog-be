import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/features/users/data-access/contants/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: ObjectId;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true, default: Role.User })
  role: Role;

  @Prop()
  avatar: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ unique: true })
  socialId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
