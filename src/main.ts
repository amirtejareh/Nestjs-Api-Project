import { AppModule } from "./app/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SeederService } from "./seed/seed.service";
import { config } from "dotenv";
import { ThrottleMiddleware } from "./middleware/throttle.middleware";
import express from "express";
import { join } from "path";

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
  app.use(new ThrottleMiddleware().use);
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  app.listen(3000);
}

bootstrap();
