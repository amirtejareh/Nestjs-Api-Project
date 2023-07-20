import { AppModule } from "./app/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SeederService } from "./seed/seed.service";
import { config } from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get<SeederService>(SeederService);
  config();

  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Karanbala")
    .setDescription("The Karanbala API description")
    .setVersion("0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);
  await seederService.seed();
  app.listen(3000);
}

bootstrap();
