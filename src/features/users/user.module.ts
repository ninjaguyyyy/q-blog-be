import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/features/users/data-access/repositories/user.repository';
import {
  User,
  UserSchema,
} from 'src/features/users/data-access/schemas/user.schema';
import { UserService } from 'src/features/users/data-access/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
