import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from 'src/features/ability/ability.factory';

@Global()
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
