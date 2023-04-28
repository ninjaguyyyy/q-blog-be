import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import { SWAGGER_API_ROOT } from 'src/constants/app.constant';
import { initSwagger } from 'src/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  initSwagger(app, SWAGGER_API_ROOT);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(5000, () => {
    Logger.log('App is running ...');
  });
}
bootstrap();
