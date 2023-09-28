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

export default app;
