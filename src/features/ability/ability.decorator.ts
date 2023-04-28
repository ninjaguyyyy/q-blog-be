import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from 'src/features/ability/ability.factory';
import { User } from 'src/features/users/data-access/schemas/user.schema';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequireRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequireRule {
  action = Action.Read;
  subject = User;
}
