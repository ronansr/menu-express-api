import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const PORT = process.env.TYPEORM_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  url: process.env.TYPEORM_URI_DB,
  port: 5432, //PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: "postgres", //"test_orm",
  entities: [`${__dirname}/**/entities/*.{ts, js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
  ssl: { rejectUnauthorized: false },
});
