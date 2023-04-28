import { Injectable } from '@nestjs/common';
import { SignUpBodyDto } from 'src/features/auth/data-access/dto/sign-up.dto';
import { UserRepository } from 'src/features/users/data-access/repositories/user.repository';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { GetUsersQueryDto } from 'src/features/users/dto/user-request.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(options: GetUsersQueryDto) {
    const res = await this.userRepository.getUsers(options);
    return res;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findUserByUsername(username);
    return user;
  }

  async createUser(payload: SignUpBodyDto): Promise<User | undefined> {
    const user = await this.userRepository.create(payload);
    delete user.password;
    return user;
  }

  async delete(id: string): Promise<null> {
    const removedPost = await this.userRepository.delete(id);
    return removedPost;
  }
}
