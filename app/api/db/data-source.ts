import "reflect-metadata";
import "dotenv/config";
import { BaseEntity, DataSource } from "typeorm";
import { Task } from "./entity/task";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true,
  logging: false,
});

export const useDataSource = async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  BaseEntity.useDataSource(AppDataSource);
  return AppDataSource;
};
