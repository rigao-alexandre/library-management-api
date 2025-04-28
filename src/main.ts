import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      // exceptionFactory(errors: ValidationError[]) {
      //   return new UnprocessableEntityException(errors);
      // },
    }),
  );
  await app.listen(3000);
}
bootstrap();
