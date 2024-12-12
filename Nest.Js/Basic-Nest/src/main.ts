import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // This will help us to track all the malicious data attached in request body which are not a part of CreateUserDto.
    forbidNonWhitelisted: true, // This will help us to through the error if any invalid data is attached in body. Nest js willl not process the request in such case and throw error.
    transform: true // This make sure that the type should be Properly mapped for each validation Pipe with respect to their respective Dto.
  }))
  await app.listen(3000);
}
bootstrap();
