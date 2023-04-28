import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
import {
  User,
  UserDocument,
} from 'src/features/users/data-access/schemas/user.schema';
import { GetUsersQueryDto } from 'src/features/users/dto/user-request.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUsers(options: GetUsersQueryDto) {
    const { page = 1, limit = 0, search } = options;

    let filters: FilterQuery<UserDocument> = {};
    search &&
      (filters = {
        $or: [
          { title: new RegExp(search, 'i') },
          { content: new RegExp(search, 'i') },
        ],
      });

    const users = await this.userModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const total = await this.userModel.count().exec();

    return { users, total };
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).lean().exec();
  }

  async create(payload: SignUpBodyDto): Promise<User | undefined> {
    const createdUser = new this.userModel(payload);
    return await createdUser.save();
  }

  async delete(id: string): Promise<null> {
    const removedUser = await this.userModel.findByIdAndRemove(id).exec();

    if (!removedUser) {
      throw new NotFoundException(
        'The user with that id does not exist in the system. Please try another id.',
      );
    }

    return null;
  }
}
