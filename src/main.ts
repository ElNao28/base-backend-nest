import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Base backend')
    .setDescription(
      `Base API backend
      <br/>
      <a href='http://localhost:3000/api/json'>http://localhost:3000/api/json</a>
      `,
    )
    .setVersion('1.2.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
