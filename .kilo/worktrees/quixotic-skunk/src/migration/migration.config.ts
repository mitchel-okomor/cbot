import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import * as path from "path";

config({
  path:
    process.env.NODE_ENV == "production"
      ? path.resolve(__dirname, "../../.prod.env")
      : path.resolve(__dirname, "../../.env"),
});

const configService = new ConfigService();

const dbConfig = {
  type: "postgres",
  host: configService.get<string>("POSTGRES_HOST"),
  port: configService.get<string>("POSTGRES_PORT"),
  username: configService.get<string>("POSTGRES_USER"),
  password: configService.get<string>("POSTGRES_PASSWORD"),
  database: configService.get<string>("POSTGRES_DB"),
  autoLoadEntities: true,
  synchronize: false,
  entities: [__dirname + "/../database/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/./migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
  ssl: process.env.APP_ENV === "prod" ? false : { rejectUnauthorized: false },
  //   { rejectUnauthorized: false },
};
export const dataSource = new DataSource(dbConfig as DataSourceOptions);
