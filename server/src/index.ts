import "reflect-metadata";
import "dotenv/config";
import { getDbConnection } from "./db";
import app from "./app";

async function init() {
  // await getDbConnection();

  return app.listen(4001, () => {
    console.log(
      `App is running at http://localhost:%d in %s mode`,
      app.get("port"),
      app.get("env")
    );
  });
}

const server = init();

export default server;
