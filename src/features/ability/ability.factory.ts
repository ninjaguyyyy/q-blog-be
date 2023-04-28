import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Category } from 'src/features/categories/category.schema';
import { Post } from 'src/features/posts/data-access/schemas/post.schema';
import { User } from 'src/features/users/data-access/schemas/user.schema';
import { isAdmin } from 'src/utils/common';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<typeof User | typeof Post | typeof Category>
  | 'all';

type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (isAdmin(user)) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Manage, 'all');
      can(Action.Read, User);
      cannot(Action.Read, User, { _id: { $ne: user._id } }).because(
        'You cannot read another user',
      );
      cannot(Action.Create, Post);
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
