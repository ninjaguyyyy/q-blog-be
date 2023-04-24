import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/features/users/data-access/repositories/user.repository';
import { User } from 'src/features/users/data-access/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findUserByUsername(username);
    return user;
  }
}
