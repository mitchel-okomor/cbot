import { NestFactory } from "@nestjs/core";
import { CbotModule } from "./cbot.module";
import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
  VersioningType,
  Logger as NestLogger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { json, urlencoded } from "express";
import { config } from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./filters";
import { TransformInterceptor } from "./interceptors";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import * as path from "path";
import { Logger } from "nestjs-pino";

config({
  path:
    process.env.NODE_ENV == "production"
      ? path.resolve(__dirname, "../../.prod.env")
      : path.resolve(__dirname, "../../.env"),
});

Bugsnag.start({
  apiKey: process.env.BUGS_NAG_API_KEY,
  plugins: [BugsnagPluginExpress],
  collectUserIp: true,
  hostname: process.env.BUGS_SNAG_PROJECT || "pp",
});
//
const middleware = Bugsnag.getPlugin("express");

async function bootstrap() {
  const app = await NestFactory.create(CbotModule);
  const configService = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  const jsonLimit = process.env.REQUEST_JSON_LIMIT || "5mb";
  const urlEncodedLimit = process.env.REQUEST_URLENCODED_LIMIT || "1mb";
  app.use(json({ limit: jsonLimit }));
  app.use(urlencoded({ extended: true, limit: urlEncodedLimit }));

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("product pointers api")
    .addGlobalParameters({
      in: "header",
      required: false,
      name: "x-api-key",
      schema: {
        example: "paste here your api key here",
      },
    })
    .setDescription(
      "This is the documentation for product pointers backend service",
    )
    .addBearerAuth({
      type: "http",
      scheme: "Bearer",
      bearerFormat: "JWT",
      description: "Enter JWT auth token",
      in: "header",
    })
    .addTag("product pointers")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // Expose Swagger JSON at /api/docs-json
  app.getHttpAdapter().get("/api/docs-json", (req, res) => {
    res.json(document);
  });

  app.useLogger(app.get(Logger));

  app.enableCors();

  //Bugsnag
  app.use(middleware.requestHandler);
  app.use(middleware.errorHandler);

  const httpRef = app.getHttpAdapter().getHttpServer();
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, new NestLogger()));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(configService.get("PORT"), () =>
    console.log(`App is running on: ${configService.get("PORT")}`),
  );
}

bootstrap();
