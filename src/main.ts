import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(helmet());
  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(`Server is listening on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
