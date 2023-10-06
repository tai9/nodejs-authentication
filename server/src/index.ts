import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import sessions from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { getDbConnection } from "./config/db";
import { requestLogger } from "./middlewares/requestLogger";
import authRouters from "./routers/auth.router";
import publicRouters from "./routers/public.router";

const redisClient = new Redis();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

declare module "express-session" {
  interface SessionData {
    username: string;
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.ORIGINS,
    credentials: true,
  })
);

app.set("port", process.env.PORT || 4100);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cookieParser());

const maxAge = 1000 * 60 * 5; //5min
app.use(
  sessions({
    secret: "abccc",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
    store: redisStore,
  })
);

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

app.get("/get-session", (req, res) => {
  return res.status(200).json({
    status: "ok",
    data: req.session,
  });
});

app.get("/set-session", (req, res) => {
  try {
    req.session.username = "tailorrrr";
    return res.send(req.session);
  } catch (error) {
    console.error("Error setting session:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/sign-in", (req, res) => {
  const username = req.body.username;
  if (username === "tailor") {
    req.session.username = username;
    return res.status(200).json({
      status: "ok",
    });
  }
  return res.status(401).json({
    status: "fail",
  });
});

app.post("/sign-out", (req, res) => {
  const session = req.session;
  const username = req.body.username;
  if (username === "tailor") {
    return session.destroy(() => {
      res.status(200).json({
        status: "ok",
      });
    });
  }
  return res.status(401).json({
    status: "fail",
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
