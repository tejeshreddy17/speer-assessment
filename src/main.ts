import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { noteModule } from './notes/notes.module';
import { SwaggerUIModules } from './api-docs-index/swagger-ui-modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerUI(app);

  await app.listen(3000);

  function setupSwaggerUI(app: INestApplication) {
    setupSwaggerUIForModule(app, 'note', noteModule);
  }

  function setupSwaggerUIForModule(
    app: INestApplication,
    name: string,
    module: any,
  ) {
    const options = new DocumentBuilder()
      .setTitle(`${name} module`)
      .setDescription(`REST API for ${name} module`)
      .setVersion('3.0')
      .addTag(name)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      include: [module],
    });
    SwaggerModule.setup(`api-docs/${name}`, app, document);
    SwaggerUIModules.push(name);
  }
}
bootstrap();
