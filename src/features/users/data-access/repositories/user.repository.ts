import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
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

  async create(payload: SignUpBodyDto): Promise<User | undefined> {
    const createdUser = new this.userModel(payload);
    return await createdUser.save();
  }
}
