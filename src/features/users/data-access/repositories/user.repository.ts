import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from 'src/features/users/data-access/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).lean().exec();
  }
}
