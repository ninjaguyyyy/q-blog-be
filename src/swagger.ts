import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SWAGGER_API_NAME = 'q-blog';
const SWAGGER_API_DESCRIPTION = 'API description';
const SWAGGER_API_CURRENT_VERSION = '1.0';
const DEFAULT_PATH = 'api';

const config = new DocumentBuilder()
  .setTitle(SWAGGER_API_NAME)
  .setDescription(SWAGGER_API_DESCRIPTION)
  .setVersion(SWAGGER_API_CURRENT_VERSION)
  .addBearerAuth()
  .build();

export function initSwagger(app: INestApplication, path?: string) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path || DEFAULT_PATH, app, document);
}
