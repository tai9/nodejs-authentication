import { DataSource } from "typeorm";
import { User } from "./entities/User";

export let AppDataSource: DataSource;

export const getDbConnection = async () => {
  if (AppDataSource) return AppDataSource;

  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [User],
    synchronize: process.env.NODE_ENV === "development",
    logging: false,
    ssl: true,
  });

  // to initialize the initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      console.log("Connected to DB");
    })
    .catch((error) => {
      throw error;
    });
};
