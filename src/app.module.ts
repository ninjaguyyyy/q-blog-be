import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from 'src/config/config.module';
import { AuthModule } from 'src/features/auth/auth.module';
import { CategoriesModule } from 'src/features/categories/categories.module';
import { PostsModule } from 'src/features/posts/post.module';
import { UsersModule } from 'src/features/users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilityGuard } from 'src/features/ability/ability.guard';
import { AbilityModule } from 'src/features/ability/ability.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          uri: configService.get('DB_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    PostsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AbilityGuard,
    // },
  ],
})
export class AppModule {}
