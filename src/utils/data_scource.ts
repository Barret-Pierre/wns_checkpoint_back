import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

export const datasource = new DataSource({
  type: "sqlite",
  database: "mydb.sql",
  synchronize: true,
  logging: true,
  entities: [Country],
  subscribers: [],
  migrations: [],
});
