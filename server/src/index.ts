import "reflect-metadata";
import "dotenv/config";
import { getDbConnection } from "./db";
import express from "express";
import cors from "cors";
import publicRouters from "./routers/public.router";
import authRouters from "./routers/auth.router";
import { requestLogger } from "./middlewares/requestLogger";

const app = express();

app.use(cors());

app.set("port", process.env.PORT || 4100);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/", authRouters);
app.use("/users", publicRouters);

// connect DB
getDbConnection();

app.listen(app.get("port"), () => {
  console.log(
    `App is running at http://localhost:%d in %s mode`,
    app.get("port"),
    app.get("env")
  );
});
