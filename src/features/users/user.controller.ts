import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CheckAbilities,
  ReadUserAbility,
} from 'src/features/ability/ability.decorator';
import { Action } from 'src/features/ability/ability.factory';
import {
  CreatePostBodyDto,
  UpdatePostBodyDto,
} from 'src/features/posts/data-access/dto/post-request.dto';
import { PostResponseDto } from 'src/features/posts/data-access/dto/post-response.dto';
import { Post as PostModel } from 'src/features/posts/data-access/schemas/post.schema';
import { UserService } from 'src/features/users/data-access/services/user.service';
import { GetUsersQueryDto } from 'src/features/users/dto/user-request.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '../../utils/pipes/parse-objectId.pipe';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { AbilityGuard } from 'src/features/ability/ability.guard';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CheckAbilities(new ReadUserAbility())
  getUsers(@Query() query: GetUsersQueryDto) {
    return this.userService.getUsers(query);
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  deletePost(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
