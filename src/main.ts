import { AppModule } from "./app/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SeederService } from "./seed/seed.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get<SeederService>(SeederService);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Karanbala")
    .setDescription("The Karanbala API description")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await seederService.seed();
  app.listen(3000);
}

bootstrap();
