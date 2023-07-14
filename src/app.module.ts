import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { CustomConfigModule } from 'src/config/config.module';
import { AbilityModule } from 'src/features/ability/ability.module';
import { AuthModule } from 'src/features/auth/auth.module';
import { CategoriesModule } from 'src/features/categories/categories.module';
import { PostsModule } from 'src/features/posts/post.module';
import { UsersModule } from 'src/features/users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CustomConfigModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000, // 10 seconds,
    }),
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
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
