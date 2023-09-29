import { DataSource } from "typeorm";

let AppDataSource: DataSource;

export const getDbConnection = async () => {
  if (AppDataSource) return AppDataSource;

  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
    logging: false,
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
