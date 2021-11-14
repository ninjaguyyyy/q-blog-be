import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './modules/app/app.module';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'q-blog';
export const SWAGGER_API_DESCRIPTION = 'API description';
export const SWAGGER_API_CURRENT_VERSION = '1.0';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useStaticAssets(join(__dirname, '/static'), {
    prefix: '/swagger',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
