import "reflect-metadata";
import "dotenv/config";
import { getDbConnection } from "./db";
import express from "express";
import cors from "cors";
import publicRouters from "./routers/public.router";

const app = express();

app.use(cors());

app.set("port", process.env.PORT || 4100);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/users", publicRouters);

// connect DB
getDbConnection();

app.listen(4001, () => {
  console.log(
    `App is running at http://localhost:%d in %s mode`,
    app.get("port"),
    app.get("env")
  );
});
