import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CHECK_ABILITY,
  RequireRule,
} from 'src/features/ability/ability.decorator';
import { AbilityFactory } from 'src/features/ability/ability.factory';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.getAllAndOverride<RequireRule[]>(CHECK_ABILITY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!rules.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
