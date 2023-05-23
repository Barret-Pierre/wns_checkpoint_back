import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "sqlite",
  database: "mydb.sql",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
