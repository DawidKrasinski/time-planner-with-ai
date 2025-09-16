import "reflect-metadata";
import "dotenv/config";
import { BaseEntity, DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { Priority } from "./entities/Priority";
import path from "path";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task, Priority],
  migrations: [path.join(__dirname, "migrations/*")],
  synchronize: false,
  logging: ["query", "error"],
});

let dataSource: DataSource | undefined;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = await AppDataSource.initialize();
    BaseEntity.useDataSource(dataSource);
  }
  return dataSource;
};
